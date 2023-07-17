package com.momo.chat.dto;

import com.momo.chat.entity.Chatroom;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoomResponseDto {
    private Long roomId;
    private String roomName;
    private String lastMessage;
    private LocalDateTime lastSentTime;

    @Builder
    public RoomResponseDto(Long roomId, String roomName, String lastMessage, LocalDateTime lastSentTime) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.lastMessage = lastMessage;
        this.lastSentTime = lastSentTime;
    }

    public static RoomResponseDto from(Chatroom chatroom, String nickname) {
        return RoomResponseDto.builder()
                .roomId(chatroom.getChatroomId())
                .roomName(nickname)
                .lastMessage(chatroom.getLastMessage())
                .lastSentTime(chatroom.getLastMessageSentTime())
                .build();
    }
}
