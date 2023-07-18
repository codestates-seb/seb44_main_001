package com.momo.chat.interceptor;

import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Base64;
import java.util.Optional;

@Component
@RequiredArgsConstructor
public class MemberInterceptor implements HandlerInterceptor {
    private final MemberRepository memberRepository;
    public static ThreadLocal<Long> currentMemberStore = new ThreadLocal<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String token = request.getHeader("Authorization");
        if (token == null){
            return false;
        }
        String email = (String) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Member member = memberRepository.findByEmail(email).get();
        currentMemberStore.set(member.getMemberId());
        return true;
    }
}
