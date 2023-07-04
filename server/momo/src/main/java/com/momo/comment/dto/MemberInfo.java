package com.momo.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
public class MemberInfo {
    private Long memberId;
    private String nickname;
    private String image;
    @Builder
    public MemberInfo(Long memberId, String nickname, String image) {
        this.memberId = memberId;
        this.nickname = nickname;
        this.image = image;
    }
}
