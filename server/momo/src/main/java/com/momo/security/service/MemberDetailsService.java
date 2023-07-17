package com.momo.security.service;

import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.utils.MomoAuthorityUtils;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@Service
public class MemberDetailsService implements UserDetailsService {

    private final MemberRepository memberRepository;
    private final MomoAuthorityUtils authorityUtils;

    public MemberDetailsService(MemberRepository memberRepository, MomoAuthorityUtils authorityUtils) {
        this.memberRepository = memberRepository;
        this.authorityUtils = authorityUtils;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<Member> optionalMember = memberRepository.findByEmail(username);
        Member findMember = optionalMember.orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new MomoUserDetails(findMember);
    }

    private final class MomoUserDetails extends Member implements UserDetails {
        MomoUserDetails(Member member) {
            setMemberId(member.getMemberId());
            setEmail(member.getEmail());
            setPassword(member.getPassword());
            setRoles(member.getRoles());
        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return authorityUtils.createAuthorities(this.getRoles()); // user role 정보는 db에 있는 걸로 제공
        }

        @Override
        public String getUsername() {
            return getEmail();
        }
        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }
    }

}
