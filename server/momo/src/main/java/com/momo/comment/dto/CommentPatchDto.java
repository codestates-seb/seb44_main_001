package com.momo.comment.dto;

import lombok.Getter;

@Getter
public class CommentPatchDto {
    private Long memberId;
    private String content;
}
