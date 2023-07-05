package com.momo.post.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class PostPatchDto {
    private String title;
    private String content;
//    private String region;
//    private String imageUrl;
}