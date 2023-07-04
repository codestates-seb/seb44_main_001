package com.momo.comment.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class CommentPatchDto {
    private Long memberId;
    private String content;
}
