package com.momo.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostResponseDto {
    private Long postId;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
//    private String imageUrl;
    private Long memberId;
    private Long categoryId;
    private List<String> tags;
//    private String regionId;
}