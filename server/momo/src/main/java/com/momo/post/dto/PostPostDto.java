package com.momo.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
public class PostPostDto {
    private String title;
    private String content;
    private Long memberId;
    private Long categoryId;
    private Long locationId;
    private List<String> tags;
    private String imageUrl;
}