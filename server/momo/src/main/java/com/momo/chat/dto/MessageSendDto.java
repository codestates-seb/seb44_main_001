package com.momo.chat.dto;

import com.momo.chat.entity.Message;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class MessageSendDto {
    private Long roomId;
    private Long memberId;
    private String nickname;
    private String content;
    private LocalDateTime sentTime;

    @Builder
    public MessageSendDto(Long roomId, Long memberId, String nickname, String content, LocalDateTime sentTime) {
        this.roomId = roomId;
        this.memberId = memberId;
        this.nickname = nickname;
        this.content = content;
        this.sentTime = sentTime;
    }

    public static MessageSendDto from(Message message) {
        return MessageSendDto.builder()
                .roomId(message.getChatroom().getChatroomId())
                .memberId(message.getMember().getMemberId())
                .nickname(message.getMember().getNickname())
                .content(message.getMessage())
                .sentTime(message.getSentTime())
                .build();
    }
}
