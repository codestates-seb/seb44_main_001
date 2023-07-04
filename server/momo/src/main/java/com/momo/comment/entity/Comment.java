package com.momo.comment.entity;

import com.momo.audit.BaseEntity;
import com.momo.member.entity.Member;
import com.momo.post.entity.Post;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor
public class Comment extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long commentId;

    private String content;

    private Boolean isPostWriter;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Builder
    public Comment(String content, Boolean isPostWriter) {
        this.content = content;
        this.isPostWriter = isPostWriter;
    }

    public void addMember(Member member) {
        this.member = member;
        member.getComments().add(this);
    }

    public void addPost(Post post) {
        this.post = post;
        post.getComments().add(this);
    }

    public void updateContent(String content){
        this.content = content;
    }
}
