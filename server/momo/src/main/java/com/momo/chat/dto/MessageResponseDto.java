package com.momo.chat.dto;

import com.momo.chat.entity.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageResponseDto {
    private Long roomId;
    private Long memberId;
    private String nickname;
    private String content;
    private String participantType;
    private LocalDateTime sentTime;


    @Builder
    public MessageResponseDto(Long roomId, Long memberId, String nickname, String content, String participantType, LocalDateTime sentTime) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.content = content;
        this.participantType = participantType;
        this.sentTime = sentTime;
    }

    public static MessageResponseDto from(Message message) {
        return MessageResponseDto.builder()
                .roomId(message.getChatroom().getChatroomId())
                .memberId(message.getMember().getMemberId())
                .nickname(message.getMember().getNickname())
                .content(message.getMessage())
                .sentTime(message.getSentTime())
                .participantType(message.getParticipantType().toString())
                .build();
    }
}
