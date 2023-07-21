package com.momo.chat.dto;

import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class RoomResponseDto {
    private Long roomId;
    private String roomName;
    private Long unreadCount;
    private String lastMessage;
    private LocalDateTime lastSentTime;


    @Builder
    public RoomResponseDto(Long roomId, String roomName, Long unreadCount, String lastMessage, LocalDateTime lastSentTime) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.unreadCount = unreadCount;
        this.lastMessage = lastMessage;
        this.lastSentTime = lastSentTime;
    }

    public static RoomResponseDto from(MemberChatroom memberChatroom) {
        return RoomResponseDto.builder()
                .roomId(memberChatroom.getChatroom().getChatroomId())
                .roomName(memberChatroom.getRoomName())
                .unreadCount(memberChatroom.getUnreadCount())
                .lastMessage(memberChatroom.getChatroom().getLastMessage())
                .lastSentTime(memberChatroom.getChatroom().getLastMessageSentTime())
                .build();
    }
}
