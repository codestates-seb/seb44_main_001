package com.momo.security.oauth2.handler_;


import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.jwt.JwtTokenizer;
import com.momo.security.utils.MomoAuthorityUtils;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.net.URI;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


public class OAuth2MemberSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JwtTokenizer jwtTokenizer;
    private final MomoAuthorityUtils authorityUtils;
    private final MemberRepository memberRepository;

    public OAuth2MemberSuccessHandler(JwtTokenizer jwtTokenizer, MomoAuthorityUtils authorityUtils, MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.memberRepository = memberRepository;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        var oAuth2User = (OAuth2User) authentication.getPrincipal();

        String email = String.valueOf(oAuth2User.getAttributes().get("email"));
        if (email.equals("null")) {

            Map<String, Object> kakaoAccount = oAuth2User.getAttribute("kakao_account");
            email = String.valueOf(kakaoAccount.get("email"));
        }

        List<String> authorities = authorityUtils.createRoles(email);
        if (memberRepository.findByEmail(email).isEmpty()) {
            saveMember(email, authorities);
        }
        redirect(request, response, email, authorities);
    }

    private void saveMember(String email, List<String> authorities) {
        Member member = new Member();
        member.setEmail(email);
        member.setRoles(authorities);
        memberRepository.save(member);
    }

    private void redirect(HttpServletRequest request, HttpServletResponse response, String username, List<String> authorities) throws IOException {
        String accessToken = delegateAccessToken(username, authorities);
        String refreshToken = delegateRefreshToken(username);

        Member member = memberRepository.findByEmail(username)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));



        response.setHeader("Authorization", "Bearer " + accessToken);
        response.setHeader("Refresh", refreshToken);

        String uri = createURI(accessToken, refreshToken, member.getMemberId().toString()).toString();


        getRedirectStrategy().sendRedirect(request, response, uri);
    }

    private String delegateAccessToken(String username, List<String> authorities) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", username);
        claims.put("roles", authorities);

        long memberId = memberRepository.findByEmail(username).get().getMemberId();
        claims.put("memberId", memberId);
        System.out.println(username);

        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getAccessTokenExpirationMinutes());

        String base64EncodedKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String accessToken = jwtTokenizer.generateAccessToken(claims, subject, expiration, base64EncodedKey);

        return accessToken;
    }

    private String delegateRefreshToken(String username) {
        String subject = username;
        Date expiration = jwtTokenizer.getTokenExpiration(jwtTokenizer.getRefreshTokenExpirationMinutes());
        String base64EncodedSecretKey = jwtTokenizer.encodeBase64SecretKey(jwtTokenizer.getSecretKey());

        String refreshToken = jwtTokenizer.generateRefreshToken(subject, expiration, base64EncodedSecretKey);

        return refreshToken;
    }


    private URI createURI(String accessToken, String refreshToken, String memberId) {

        MultiValueMap<String, String> queryParams = new LinkedMultiValueMap<>();

        queryParams.add("access_token", accessToken);
        queryParams.add("refresh_token", refreshToken);
        queryParams.add("member_id", memberId);

        URI uri = UriComponentsBuilder
                .newInstance()
                .scheme("https")
                .host("letsmomo.netlify.app")
//                .port(8080)
                .path("/oauth-signup") // 여기에 추가 정보 입력 사이트로
                .queryParams(queryParams)
                .build()
                .toUri();
        return uri;
    }

}
