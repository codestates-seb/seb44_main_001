package com.momo.post.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfo {
    private Long memberId;
    private String nickname;
    private String profileImage;
    @Builder
    public MemberInfo(Long memberId, String nickname, String profileImage) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.profileImage = profileImage;
    }
}