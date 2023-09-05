package com.momo.chat.entity;

import com.momo.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
@Getter
@Setter
@Entity
@NoArgsConstructor
public class Message {
    @Id
    @GeneratedValue
    private Long id;

    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroomId")
    private Chatroom chatroom;

    private LocalDateTime sentTime;

    @Enumerated(EnumType.STRING)
    private ParticipantType participantType;

    public enum ParticipantType {
        MEMBER, NOTIFICATION
    }

    @Builder
    public Message(String message, Member member, Chatroom chatroom, LocalDateTime sentTime, ParticipantType participantType) {
        this.message = message;
        this.member = member;
        this.chatroom = chatroom;
        this.sentTime = sentTime;
        this.participantType = participantType;
    }

    public static Message from(String message, Member member, Chatroom chatroom, LocalDateTime sentTime, String participantType) {
        if (participantType.equals(ParticipantType.MEMBER.toString())) {
            return Message.builder()
                    .message(message)
                    .member(member)
                    .chatroom(chatroom)
                    .sentTime(sentTime)
                    .participantType(ParticipantType.MEMBER)
                    .build();
        }
        else {
            return Message.builder()
                    .message(message)
                    .member(member)
                    .chatroom(chatroom)
                    .sentTime(sentTime)
                    .participantType(ParticipantType.NOTIFICATION)
                    .build();
        }
    }
}

