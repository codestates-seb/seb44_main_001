package com.momo.member.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.momo.audit.BaseEntity;
import com.momo.category.entity.Category;
import com.momo.comment.entity.Comment;

import com.momo.location.entity.Location;

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

    @Column(unique = true)
    private String email;
    @JsonIgnore
    private String password;
    private Long locationId;
    @OneToOne
    @JoinColumn(name = "location")
    private Location location;
    private String welcomeMsg;
    private String profileImage;
    private String nickname;
    private Boolean isMale;
    private Integer age;
//    private LocalDateTime createdAt;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();



}
