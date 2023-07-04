package com.momo.comment.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CommentPostDto {
    private Long memberId;
    private String content;
}
