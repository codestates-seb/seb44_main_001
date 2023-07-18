package com.momo.postlike.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostLikeResponseDto {
    private boolean isLiked;
    private Long likeCount;

    public PostLikeResponseDto(Long likeCount,Boolean isLiked) {
        this.likeCount = likeCount;
        this.isLiked = isLiked;
    }
}
