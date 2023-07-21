package com.momo.security.controller;

import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.jwt.JwtTokenizer;
import com.momo.security.service.TokenBlacklistService;
import com.momo.security.service.TokenService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Optional;

@Controller
@RequestMapping("/auth")
public class AuthController {

    private final JwtTokenizer jwtTokenizer;
    private final TokenBlacklistService tokenBlacklistService;
    private final TokenService tokenService;
    private final MemberRepository memberRepository;

    public AuthController(JwtTokenizer jwtTokenizer,
                          TokenBlacklistService tokenBlacklistService,
                          TokenService tokenService,
                          MemberRepository memberRepository) {
        this.jwtTokenizer = jwtTokenizer;
        this.tokenBlacklistService = tokenBlacklistService;
        this.tokenService = tokenService;
        this.memberRepository = memberRepository;
    }

    @GetMapping("/login-form")
    public String loginForm() {
        return "login";
    }

    @GetMapping("/access-denied")
    public String accessDenied() {
        return "access-denied";
    }

    @PostMapping("/login")
    public String login() {
        System.out.println("Login successfully!");
        return "home";
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletRequest request) {
        String token = jwtTokenizer.resolveToken(request);
        if (token != null && jwtTokenizer.validateToken(token)) {
            tokenBlacklistService.addToBlacklist(token);
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }


}