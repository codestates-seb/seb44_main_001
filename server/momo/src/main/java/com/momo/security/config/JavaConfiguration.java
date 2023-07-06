package com.momo.security.config;

import com.momo.member.repository.MemberRepository;
import com.momo.member.service.MemberService;
import com.momo.security.utils.MomoAuthorityUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class JavaConfiguration {
    @Bean
    public MemberService dbMemberService(MemberRepository memberRepository,
                                         PasswordEncoder passwordEncoder,
                                         MomoAuthorityUtils authorityUtils) {
        return new MemberService(memberRepository, passwordEncoder, authorityUtils);
    }
}
