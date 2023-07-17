package com.momo.chat.entity;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Chatroom {
    @Id
    @GeneratedValue
    private Long chatroomId;
    private String name;

    private String lastMessage;
    private LocalDateTime lastMessageSentTime;

    @Builder
    public Chatroom(String name, String lastMessage, LocalDateTime lastMessageSentTime) {
        this.name = name;
        this.lastMessage = lastMessage;
        this.lastMessageSentTime = lastMessageSentTime;
    }

    @Builder
    public Chatroom(String name) {
        this.name = name;
    }

    public void addMessage(Message message) {
        this.lastMessage = message.getMessage();
        this.lastMessageSentTime = message.getSentTime();
    }
}
