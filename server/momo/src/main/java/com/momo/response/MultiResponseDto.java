package com.momo.response;

import lombok.Builder;
import lombok.Getter;

import java.util.List;
@Getter
public class MultiResponseDto<T> {
    private PageInfo pageInfo;
    private List<T> data;

    @Builder
    public MultiResponseDto(PageInfo pageInfo, List<T> data) {
        this.pageInfo = pageInfo;
        this.data = data;
    }
}
