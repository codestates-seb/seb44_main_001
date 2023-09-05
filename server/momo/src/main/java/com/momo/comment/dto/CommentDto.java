package com.momo.comment.dto;

import com.momo.comment.entity.Comment;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
public class CommentDto {
    private Long commentId;
    private String content;
    private Boolean isPostWriter;
    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
    private MemberInfo memberInfo;

    private CommentDto(Comment comment) {
        this.commentId = comment.getCommentId();
        this.content = comment.getContent();
        this.isPostWriter = comment.getIsPostWriter();
        this.createdAt = comment.getCreatedAt();
        this.editedAt = comment.getEditedAt();
        this.memberInfo = MemberInfo.builder()
                .memberId(comment.getMember().getMemberId())
                .nickname(comment.getMember().getNickname())
                .image(comment.getMember().getProfileImage())
                .build();
    }

    public static CommentDto from(Comment comment) {
        return new CommentDto(comment);
    }
}
