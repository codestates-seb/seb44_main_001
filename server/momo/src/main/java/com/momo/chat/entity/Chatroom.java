package com.momo.chat.entity;

import com.fasterxml.jackson.annotation.JsonValue;
import com.momo.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class Chatroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long chatroomId;
    private String name;

    private String lastMessage;
    private LocalDateTime lastMessageSentTime;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "roomking_id")
    private Member roomKing;

    @Enumerated(EnumType.STRING)
    private RoomType roomType;

    @Getter
    public enum RoomType {
        PERSONAL("personal"),
        GROUP("group");

        private String type;

        RoomType(String type) {
            this.type = type;
        }

        @JsonValue
        public String getType() {
            return type;
        }
    }

    @Builder
    public Chatroom(String name, String lastMessage, LocalDateTime lastMessageSentTime, RoomType roomType) {
        this.name = name;
        this.lastMessage = lastMessage;
        this.lastMessageSentTime = lastMessageSentTime;
        this.roomType = roomType;
    }

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




    public void addRoomKing(Member member) {
        this.roomKing = member;
    }

    public void updateLastMessage(String content, LocalDateTime time) {
        this.lastMessage = content;
        this.lastMessageSentTime = time;
    }

    public static Chatroom from(String name, String lastMessage, LocalDateTime lastMessageSentTime, String roomType) {
        if (roomType.equals(RoomType.PERSONAL.toString())) {
            return Chatroom.builder()
                    .name(name)
                    .lastMessage(lastMessage)
                    .lastMessageSentTime(lastMessageSentTime)
                    .roomType(RoomType.PERSONAL)
                    .build();
        }
        else {
            return Chatroom.builder()
                    .name(name)
                    .lastMessage(lastMessage)
                    .lastMessageSentTime(lastMessageSentTime)
                    .roomType(RoomType.GROUP)
                    .build();
        }
    }
}
