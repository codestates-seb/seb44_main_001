package com.momo.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatMessagesDto {
    List<MessageSendDto> chats;

    @Builder
    public ChatMessagesDto(List<MessageSendDto> chats) {
        this.chats = chats;
    }
}
