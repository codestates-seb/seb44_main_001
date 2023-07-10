package com.momo.post.dto;

import com.momo.post.dto.MemberInfo;
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
    private Long categoryId;
    private Long locationId;
    private MemberInfo memberInfo;
    private List<String> tags;

    public PostResponseDto(Long postId, String title, String content, LocalDateTime createdAt, LocalDateTime editedAt, Long categoryId, Long locationId, MemberInfo memberInfo, List<String> tags) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.categoryId = categoryId;
        this.locationId = locationId;
        this.memberInfo = memberInfo;
        this.tags = tags;
    }
}