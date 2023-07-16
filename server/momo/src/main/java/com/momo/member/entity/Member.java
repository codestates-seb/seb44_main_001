package com.momo.member.entity;

import com.momo.audit.BaseEntity;
import com.momo.category.entity.Category;
import com.momo.comment.entity.Comment;
import com.momo.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import com.momo.post.entity.Post;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

    private String email;
    private String password;
    private Integer location;
    private String welcomeMsg;
    private String profileImage;
    private String nickname;
    private Boolean isMale;
    private Integer age;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<Post> posts = new ArrayList<>();

//    @OneToMany(mappedBy = "member")
//    private List<Comment> comments = new ArrayList<>();



}
