package com.momo.member.dto;

import com.momo.comment.entity.Comment;

import com.momo.location.entity.Location;
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
    private String welcomeMsg;
    private String nickname;
    private Boolean isMale;
    private Integer age;
    private LocalDateTime createdAt;
    private String profileImage;
    private Location location;

}
