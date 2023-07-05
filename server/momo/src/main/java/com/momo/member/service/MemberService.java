package com.momo.member.service;

import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    public MemberService(MemberRepository memberRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }


    /* 회원가입 */
    public Member saveMember(Member member) {
        member.setCreatedAt(LocalDateTime.now());
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        member.setPassword(encodedPassword);
        return memberRepository.save(member);
    }

    /* 특정 멤버 찾기 */
    public Member findMember(Long memberId) {
        return findVerifiedMember(memberId);
    }

    /* 멤버 전부 찾기 */
    public List<Member> findMembers() {
        return memberRepository.findAll();
    }

    /* 멤버 정보 수정 */
    public Member updateMember(Long memberId, Member member) {
        Member findMember = findVerifiedMember(memberId);

        Optional.ofNullable(member.getEmail())
                .ifPresent(findMember::setEmail);
        Optional.ofNullable(member.getPassword())
                .ifPresent(findMember::setPassword);
        Optional.ofNullable(member.getWelcomeMsg())
                .ifPresent(findMember::setWelcomeMsg);
//        Optional.ofNullable(member.getLocation())
//                .ifPresent(findMember::setLocation);
        Optional.ofNullable(member.getNickname())
                .ifPresent(findMember::setNickname);
        Optional.ofNullable(member.getIsMale())
                .ifPresent(findMember::setIsMale);
        Optional.ofNullable(member.getAge())
                .ifPresent(findMember::setAge);

        return memberRepository.save(findMember);
    }

    /* 특정 멤버 삭제 */
    public void removeMember(Long memberId) {
        Member findMember = findVerifiedMember(memberId);
        memberRepository.delete(findMember);
    }

    /* 모든 멤버 삭제 */
    public void removeMembers() {
        memberRepository.deleteAll();
    }

    /* optional값 멤버 구별 */
    private Member findVerifiedMember(Long memberId) {
        Optional<Member> optionalMember =
                memberRepository.findById(memberId);
        Member findMember =
                optionalMember.orElseThrow(() ->
                        new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return findMember;
    }
}
