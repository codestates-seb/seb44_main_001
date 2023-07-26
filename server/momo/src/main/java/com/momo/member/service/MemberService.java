package com.momo.member.service;

import com.momo.chat.entity.Chatroom;
import com.momo.chat.repository.ChatroomRepository;
import com.momo.chat.repository.MemberChatroomRepository;
import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.location.entity.Location;
import com.momo.location.repository.LocationRepository;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import com.momo.security.utils.MomoAuthorityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final MomoAuthorityUtils authorityUtils;
    private final LocationRepository locationRepository;
    private final MemberChatroomRepository memberChatroomRepository;

    /* 회원가입 */
    public Member saveMember(Member member) {
//        member.setCreatedAt(LocalDateTime.now());
        verifiedEmailExists(member.getEmail());
        verifiedNicknameExists(member.getNickname());
        String encodedPassword = passwordEncoder.encode(member.getPassword());
        Location location = locationRepository.findById(member.getLocationId()).orElse(null);
        member.setLocation(location);
        member.setPassword(encodedPassword);
        List<String> roles = authorityUtils.createRoles(member.getEmail());
        member.setRoles(roles);

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
                .ifPresent(newPass -> {
                    String encodedPassword = passwordEncoder.encode(newPass);
                    member.setPassword(encodedPassword);
                });
        Optional.ofNullable(member.getWelcomeMsg())
                .ifPresent(findMember::setWelcomeMsg);
        Optional.ofNullable(member.getProfileImage())
                .ifPresent(findMember::setProfileImage);
        Optional.ofNullable(member.getLocationId())
                .ifPresent(locationId -> {
                    Location location = locationRepository.findById(locationId).orElse(null);
                    findMember.setLocation(location);
                });
        Optional.ofNullable(member.getNickname())
                .ifPresent(nickname -> {
                    verifiedNicknameExists(nickname);

                    String curNick = findMember.getNickname();
                    findMember.setNickname(nickname);
                    memberChatroomRepository.findByRoomNameAndChatroom_RoomType(curNick, Chatroom.RoomType.PERSONAL)
                            .stream()
                            .forEach(mc -> mc.setRoomName(nickname));
                });
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

    /* 이메일 중복검사 */
    private void verifiedEmailExists(String email) {
        memberRepository.findByEmail(email)
                .ifPresent(existingUser -> {
                    throw new BusinessLogicException(ExceptionCode.MEMBER_EXISTS);
                });
    }

    /* 닉네임 중복검사 */
    private void verifiedNicknameExists(String nickname) {
        memberRepository.findByNickname(nickname)
                .ifPresent(existingUser -> {
                    throw new BusinessLogicException(ExceptionCode.NICKNAME_EXISTS);
                });
    }
}
