package com.momo.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostPostDto {
    private String title;
    private String content;
    private Long memberId;
    private Long categoryId;
//    private String regionId;
    //    private String imageUrl;
}