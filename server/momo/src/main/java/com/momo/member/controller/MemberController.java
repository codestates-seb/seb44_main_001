package com.momo.member.controller;

import com.momo.member.dto.MemberPatchDto;
import com.momo.member.dto.MemberPostDto;
import com.momo.member.entity.Member;
import com.momo.member.mapper.MemberMapper;
import com.momo.member.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/members")
public class MemberController {

    private final MemberService memberService;
    private final MemberMapper mapper;

    @Autowired
    public MemberController(MemberService memberService, MemberMapper mapper) {
        this.memberService = memberService;
        this.mapper = mapper;
    }

    /* 특정 회원 찾기 */
    @GetMapping("/{member-id}")
    public ResponseEntity getMember(@PathVariable("member-id") Long memberId){
        Member findMember = memberService.findMember(memberId);
//        return new ResponseEntity(mapper.memberToMemberResponseDto(findMember), HttpStatus.OK);
        return new ResponseEntity(findMember, HttpStatus.OK);
    }

    /* 모든 회원 조회 */
    @GetMapping
    public List<Member> getMembers() {
        List<Member> members = memberService.findMembers();
        return members;
    }

    /* 회원 가입 */
    @PostMapping("/register")
    public ResponseEntity createMember(@RequestBody MemberPostDto memberPostDto) {
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        Member savedMember = memberService.saveMember(member);

        return new ResponseEntity(mapper.memberToMemberResponseDto(savedMember), HttpStatus.CREATED);
    }

    /* 회원 정보 수정 */
    @PatchMapping("/{member-id}")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @RequestBody MemberPatchDto memberPatchDto) {

        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        Member updatedMember = memberService.updateMember(memberId, member);

        return new ResponseEntity(mapper.memberToMemberResponseDto(updatedMember), HttpStatus.OK);

    }

    /* 특정 회원 정보 삭제 */
    @DeleteMapping("/{member-id}")
    public ResponseEntity deleteMember(@PathVariable("member-id") Long memberId){
        memberService.removeMember(memberId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /* 모든 회원 정보 삭제 */
    @DeleteMapping
    public ResponseEntity deleteMembers() {
        memberService.removeMembers();
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
