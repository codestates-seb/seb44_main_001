package com.momo.member.mapper;


import com.momo.member.dto.MemberPatchDto;
import com.momo.member.dto.MemberPostDto;
import com.momo.member.dto.MemberResponseDto;
import com.momo.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberPostDtoToMember(MemberPostDto memberPostDto);

    Member memberPatchDtoToMember(MemberPatchDto memberPatchDto);

    MemberResponseDto memberToMemberResponseDto(Member member);

}
