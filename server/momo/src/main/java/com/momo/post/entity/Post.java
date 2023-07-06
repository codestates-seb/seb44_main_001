package com.momo.post.entity;

import com.momo.category.entity.Category;
import com.momo.comment.entity.Comment;
import com.momo.location.entity.Location;
import com.momo.member.entity.Member;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import javax.swing.plaf.synth.Region;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long postId;

    private String title;
    private String content;

    @ElementCollection
    @Column(name = "tag")
    private List<String> tags;

    private LocalDateTime createdAt;
    private LocalDateTime editedAt;
//    private String imageUrl;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "location_id")
    private Location location;

    @OneToMany(mappedBy = "post")
    private List<Comment> comments = new ArrayList<>();
    public void setMemberId(Long memberId) {
        this.member = new Member();
        this.member.setMemberId(memberId);
    }
}

