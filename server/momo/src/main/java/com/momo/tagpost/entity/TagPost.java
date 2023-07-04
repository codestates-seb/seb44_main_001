package com.momo.tagpost.entity;

import com.momo.post.entity.Post;
import com.momo.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TagPost {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long tagPostId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "tag_id")
    private Tag tag;
}
