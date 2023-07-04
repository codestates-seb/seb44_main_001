package com.momo.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPostDto {
    private String email;
    private String password;
    private String welcomeMsg;
    private String location;
    private String nickname;
    private Boolean isMale;
    private Integer age;
}
