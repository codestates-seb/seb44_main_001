package com.momo.post.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryRangeDto {
    private Long startCategoryId;
    private Long endCategoryId;

    public CategoryRangeDto(Long startCategoryId, Long endCategoryId) {
        this.startCategoryId = startCategoryId;
        this.endCategoryId = endCategoryId;
    }
}