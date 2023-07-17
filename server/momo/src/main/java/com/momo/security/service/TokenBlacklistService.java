package com.momo.security.service;

import com.momo.security.jwt.JwtTokenizer;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
public class TokenBlacklistService {

    private final JwtTokenizer jwtTokenizer;
    private static final String BLACKLIST_KEY = "token:blacklist";
    private final RedisTemplate<String, String> redisTemplate;

    public TokenBlacklistService(JwtTokenizer jwtTokenizer, RedisTemplate<String, String> redisTemplate) {
        this.jwtTokenizer = jwtTokenizer;
        this.redisTemplate = redisTemplate;
    }

    public void addToBlacklist(String token) {
        Jws<Claims> claimsJws = Jwts.parserBuilder().setSigningKey(jwtTokenizer.getBase64EncodedSecretKey()).build().parseClaimsJws(token);
        long expirationTime = claimsJws.getBody().getExpiration().getTime();
        long expirationDuration = expirationTime - System.currentTimeMillis();

        redisTemplate.opsForValue().set(BLACKLIST_KEY + ":" + token, "blacklisted", expirationDuration, TimeUnit.MILLISECONDS);
    }

    public boolean isTokenBlacklisted(String token) {
        return redisTemplate.hasKey(BLACKLIST_KEY + ":" + token);
    }
}
