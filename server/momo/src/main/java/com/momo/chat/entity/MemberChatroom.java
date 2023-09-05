package com.momo.chat.entity;

import com.momo.member.entity.Member;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

@Data
@Entity
@NoArgsConstructor
public class MemberChatroom {
    @Id
    @GeneratedValue
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberId")
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chatroomId")
    private Chatroom chatroom;

    private String roomName;

    private Long unreadCount;

    private LocalDateTime lastCheckedTime;

    @Enumerated(EnumType.STRING)
    private ChatStatus chatStatus;

    public enum ChatStatus {
        ONLINE, OFFLINE
    }

    @Builder
    public MemberChatroom(Member member, Chatroom chatroom, String roomName, LocalDateTime lastCheckedTime) {
        this.member = member;
        this.chatroom = chatroom;
        this.roomName = roomName;
        this.lastCheckedTime = lastCheckedTime;
        this.unreadCount = 0L;
        this.chatStatus = ChatStatus.OFFLINE;
    }

    public static MemberChatroom from(Member member, Chatroom chatroom, String roomName, LocalDateTime now) {
        return MemberChatroom.builder()
                .roomName(roomName)
                .member(member)
                .chatroom(chatroom)
                .lastCheckedTime(now)
                .build();
    }

    public void addUnreadCount(){
        this.unreadCount++;
    }

    public void resetUnreadCount(){
        this.unreadCount = 0L;
    }

    public void setOnline(){
        this.chatStatus = ChatStatus.ONLINE;
        this.unreadCount = 0L;
    }

    public void setOffline(){
        this.chatStatus = ChatStatus.OFFLINE;
        this.lastCheckedTime = LocalDateTime.now();
    }
}
