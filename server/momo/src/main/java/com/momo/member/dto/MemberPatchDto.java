package com.momo.member.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberPatchDto {
    private String email;
    private String password;
    private String welcomeMsg;
    private Long locationId;
    private String nickname;
    private Boolean isMale;
    private Integer age;
}
