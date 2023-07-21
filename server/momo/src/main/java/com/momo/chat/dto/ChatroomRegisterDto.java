package com.momo.chat.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatroomRegisterDto {
    private Long memberId;
    private String roomName;
    private String roomType;
}
