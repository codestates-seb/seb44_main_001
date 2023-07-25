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
    private CategoryInfo categoryInfo;
    private LocationInfo locationInfo;
    private MemberInfo memberInfo;
    private List<String> tags;
    private boolean isLiked;
    private Long postLikeCount;
    private Long commentCount;
    private String imageUrl;

    public PostResponseDto(Long postId, String title, String content, LocalDateTime createdAt, LocalDateTime editedAt, CategoryInfo categoryInfo, LocationInfo locationInfo, MemberInfo memberInfo, List<String> tags, boolean isLiked, Long postLikeCount, Long commentCount, String imageUrl) {
        this.postId = postId;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.categoryInfo = categoryInfo;
        this.locationInfo = locationInfo;
        this.memberInfo = memberInfo;
        this.tags = tags;
        this.isLiked = isLiked;
        this.postLikeCount = postLikeCount;
        this.commentCount = commentCount;
        this.imageUrl = imageUrl;
    }

    public PostResponseDto(Long postLikeCount, Boolean isLiked) {
        this.postLikeCount = postLikeCount;
        this.isLiked = isLiked;
    }
}

