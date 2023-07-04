package com.momo.member.entity;

import com.momo.category.entity.Category;
import com.momo.comment.entity.Comment;
import com.momo.message.entity.Message;
import com.momo.post.entity.Post;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberId;

//    private String name;
    private String email;
    private String password;
    private String location;
    private String welcomeMsg;
    private String profileImage;
    private String nickname;
    private Boolean isMale;
    private Integer age;
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "member")
    private List<Post> posts;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments;

    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;

}
