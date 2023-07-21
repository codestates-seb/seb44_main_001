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
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.*;

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
        /* Redis를 통한 토큰 검증과 만료된 토큰에 대한 로직 */
        String token = extractTokenFromRequest(request);
        if (token != null && tokenBlacklistService.isTokenBlacklisted(token) || !jwtTokenizer.validateToken(token) ) {
            // 멤버를 찾아야돼
            String refreshToken = request.getHeader("Refresh");
            if (jwtTokenizer.validateToken(refreshToken)) {
                try {
                    Jws<Claims> claims = jwtTokenizer.getClaims(refreshToken, jwtTokenizer.getBase64EncodedSecretKey());
                    String email = claims.getBody().get("sub", String.class);
                    Member member = memberRepository.findByEmail(email)
                            .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

                    String newToken = tokenService.delegateAccessToken(member);
                    response.setHeader("Authorization", "Bearer " + newToken);

                    RefreshedAccessTokenRequestWrapper refreshedRequest = new RefreshedAccessTokenRequestWrapper(request, newToken); // 만료된 토큰 대신 새로만든 토큰을 다시 넣어 request 생성
                    Map<String, Object> findMemberClaim = verifyJws(refreshedRequest);
                    setAuthenticationToContext(findMemberClaim);
                    filterChain.doFilter(refreshedRequest, response);

                } catch (SignatureException se) {
                    request.setAttribute("exception", se);
                } catch (ExpiredJwtException ee) {
                    request.setAttribute("exception", ee);
                } catch (Exception e) {
                    request.setAttribute("exception", e);
                }
            } else {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            }
        } else {
            Map<String, Object> findMemberClaim = verifyJws(request);
            setAuthenticationToContext(findMemberClaim);
            filterChain.doFilter(request, response);
        }
    }

    private String extractTokenFromRequest(HttpServletRequest request) {
        String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            return authorizationHeader.substring(7);
        }
        return null;
    }
}

class RefreshedAccessTokenRequestWrapper extends HttpServletRequestWrapper {
    private final String refreshedAccessToken;

    public RefreshedAccessTokenRequestWrapper(HttpServletRequest request, String refreshedAccessToken) {
        super(request);
        this.refreshedAccessToken = refreshedAccessToken;
    }

    @Override
    public String getHeader(String name) {
        if ("Authorization".equalsIgnoreCase(name)) {
            return "Bearer " + refreshedAccessToken;
        }
        return super.getHeader(name);
    }

    @Override
    public Enumeration<String> getHeaderNames() {
        Map<String, String> headerMap = new HashMap<>();
        Enumeration<String> headerNames = super.getHeaderNames();
        while (headerNames.hasMoreElements()) {
            String name = headerNames.nextElement();
            headerMap.put(name, getHeader(name));
        }
        return Collections.enumeration(headerMap.keySet());
    }
}
