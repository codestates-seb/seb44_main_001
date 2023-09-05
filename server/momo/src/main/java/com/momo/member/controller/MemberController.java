package com.momo.member.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.momo.comment.dto.MemberInfo;
import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.dto.MemberPatchDto;
import com.momo.member.dto.MemberPostDto;
import com.momo.member.entity.Member;
import com.momo.member.mapper.MemberMapper;
import com.momo.member.service.MemberService;
import com.momo.security.jwt.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/members")
public class MemberController {
    @Value("${cloud.aws.s3}")
    private String S3Bucket;

    private final MemberService memberService;
    private final MemberMapper mapper;
    private final AmazonS3Client amazonS3Client;
    private final JwtTokenizer jwtTokenizer;

    @Autowired
    public MemberController(MemberService memberService, MemberMapper mapper, AmazonS3Client amazonS3Client, JwtTokenizer jwtTokenizer) {
        this.memberService = memberService;
        this.mapper = mapper;
        this.amazonS3Client = amazonS3Client;
        this.jwtTokenizer = jwtTokenizer;
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

    @PostMapping("/register/image")
    public ResponseEntity putProfileImage(@RequestPart(value = "memberDto") MemberPostDto memberPostDto,
                                          @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        String imagePath = saveImageToS3(image);
        Member member = mapper.memberPostDtoToMember(memberPostDto);
        member.setProfileImage(imagePath);
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

    @PatchMapping("/{member-id}/image")
    public ResponseEntity patchMember(@PathVariable("member-id") Long memberId,
                                      @RequestPart(value = "memberPatchDto") MemberPatchDto memberPatchDto,
                                      @RequestPart(value = "image", required = false) MultipartFile image) throws IOException {
        String imagePath = saveImageToS3(image);
        Member member = mapper.memberPatchDtoToMember(memberPatchDto);
        member.setProfileImage(imagePath);
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

    @GetMapping("/search")
    public List<MemberInfo> findMembersWithNickname(@RequestParam String nickname) {
        List<Member> members = memberService.getMembersWithNickname(nickname);
        return members.stream()
                .map(member -> MemberInfo.from(member))
                .collect(Collectors.toList());
    }

    private String saveImageToS3(MultipartFile image) throws IOException {
        if (image == null) {
            return "https://momobucket.s3.ap-northeast-2.amazonaws.com/profile/profile.svg";
        }
        String randomName = UUID.randomUUID().toString();
        long size = image.getSize();

        ObjectMetadata objectMetaData = new ObjectMetadata();
        objectMetaData.setContentType(image.getContentType());
        objectMetaData.setContentLength(size);

        amazonS3Client.putObject(
                new PutObjectRequest(S3Bucket, randomName, image.getInputStream(), objectMetaData)
        );

        return amazonS3Client.getUrl(S3Bucket, randomName).toString();
    }

    /* 토큰으로 유저 찾기 */
    @GetMapping("/userInfo")
    public Member userInfo(HttpServletRequest request) {
        Integer memberId = jwtTokenizer.getMemberIdFromToken(jwtTokenizer.resolveToken(request));
        System.out.println(memberId);
        Member member = memberService.findMember(memberId.longValue());
        return member;
    }
}
