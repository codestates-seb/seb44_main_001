package com.momo.security.filter;

import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.jwt.JwtTokenizer;
import com.momo.security.service.TokenBlacklistService;
import com.momo.security.service.TokenService;
import com.momo.security.utils.MomoAuthorityUtils;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.security.SignatureException;
import org.springframework.security.authentication.AuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public class JwtVerificationFilter extends OncePerRequestFilter {
    private final JwtTokenizer jwtTokenizer;
    private final MomoAuthorityUtils authorityUtils;
    private final TokenBlacklistService tokenBlacklistService;
    private final MemberRepository memberRepository;
    private final TokenService tokenService;

    public JwtVerificationFilter(JwtTokenizer jwtTokenizer,
                                 MomoAuthorityUtils authorityUtils,
                                 TokenBlacklistService tokenBlacklistService,
                                 MemberRepository memberRepository,
                                 TokenService tokenService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.tokenBlacklistService = tokenBlacklistService;
        this.memberRepository = memberRepository;
        this.tokenService = tokenService;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String authorization = request.getHeader("Authorization");

        return authorization == null || !authorization.startsWith("Bearer");
    }

    private Map<String, Object> verifyJws(HttpServletRequest request) {
        String jws = request.getHeader("Authorization").replace("Bearer ", "");
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());
        Map<String, Object> claims = jwtTokenizer.getClaims(jws, base64EncodedSecretKey).getBody();

        return claims;
    }

    private void setAuthenticationToContext(Map<String, Object> claims) {
        String username = (String) claims.get("username");
        List<GrantedAuthority> authorities = authorityUtils.createAuthorities((List) claims.get("roles"));
        Authentication authentication = new UsernamePasswordAuthenticationToken(username, null, authorities);
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }

    /* EXCEPTION 관련 */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // System.out.println("# JwtVerificationFilter");
        // if 토큰이 만료가 됐어 -> 리프레시 토큰을 확인해 -> 리프레시 토큰이 괜찮으면 액세스 토큰을 새로 발급해줘
        /* Redis를 통한 토큰 검증과 만료된 토큰에 대한 로직 */
        String token = extractTokenFromRequest(request);
        if (token != null && tokenBlacklistService.isTokenBlacklisted(token) || jwtTokenizer.validateToken(token) ) {
            // 멤버를 찾아야돼
            String refreshToken = request.getHeader("Refresh");
            if(jwtTokenizer.validateToken(refreshToken)) {
                Jws<Claims> claims = jwtTokenizer.getClaims(token, jwtTokenizer.getBase64EncodedSecretKey());
                String email = claims.getBody().get("username", String.class);
                Member member = memberRepository.findByEmail(email)
                        .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

                String newToken = tokenService.delegateAccessToken(member);
                response.setHeader("Authorization", "Bearer " + newToken);
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("Invalid token.");
            }
        }
        try {
            Map<String, Object> claims = verifyJws(request);
            setAuthenticationToContext(claims);
        } catch (SignatureException se) {
            request.setAttribute("exception", se);
        } catch (ExpiredJwtException ee) {
            request.setAttribute("exception", ee);
        } catch (Exception e) {
            request.setAttribute("exception", e);
        }

        filterChain.doFilter(request, response);
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}
