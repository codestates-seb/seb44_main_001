package com.momo.member.dto;

import com.momo.comment.entity.Comment;
import com.momo.message.entity.Message;
import com.momo.post.entity.Post;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
public class MemberResponseDto {

    private Long memberId;
    private String email;
    private Integer location;
    private String welcomeMsg;
    private String nickname;
    private Boolean isMale;
    private Integer age;
    private LocalDateTime createdAt;
    private String profileImage;

    @OneToMany(mappedBy = "member")
    private List<Post> posts;

    @OneToMany(mappedBy = "member")
    private List<Comment> comments;

    @OneToMany(mappedBy = "sender")
    private List<Message> sentMessages;

    @OneToMany(mappedBy = "receiver")
    private List<Message> receivedMessages;
}
