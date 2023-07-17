package com.momo.post.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CategoryInfo {
    private Long categoryId;
    private String name;

    @Builder
    public CategoryInfo(Long categoryId, String name) {
        this.categoryId = categoryId;
        this.name = name;
    }
}
