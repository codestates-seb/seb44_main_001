package com.momo.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
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