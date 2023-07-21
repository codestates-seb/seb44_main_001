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
    private String roomType;
    private LocalDateTime lastSentTime;
    private LocalDateTime lastCheckedTime;
    @Builder
    public RoomResponseDto(Long roomId, String roomName, Long unreadCount, String lastMessage, String roomType, LocalDateTime lastSentTime, LocalDateTime lastCheckedTime) {
        this.roomId = roomId;
        this.roomName = roomName;
        this.unreadCount = unreadCount;
        this.lastMessage = lastMessage;
        this.roomType = roomType;
        this.lastSentTime = lastSentTime;
        this.lastCheckedTime = lastCheckedTime;
    }

    public static RoomResponseDto from(MemberChatroom memberChatroom) {
        return RoomResponseDto.builder()
                .roomId(memberChatroom.getChatroom().getChatroomId())
                .roomName(memberChatroom.getRoomName())
                .unreadCount(memberChatroom.getUnreadCount())
                .lastMessage(memberChatroom.getChatroom().getLastMessage())
                .lastSentTime(memberChatroom.getChatroom().getLastMessageSentTime())
                .lastCheckedTime(memberChatroom.getLastCheckedTime())
                .roomType(memberChatroom.getChatroom().getRoomType().getType())
                .build();
    }
}
