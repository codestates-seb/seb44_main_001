package com.momo.chat.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ChatMessagesDto {
    List<MessageResponseDto> chats;

    @Builder
    public ChatMessagesDto(List<MessageResponseDto> chats) {
        this.chats = chats;
    }
}
