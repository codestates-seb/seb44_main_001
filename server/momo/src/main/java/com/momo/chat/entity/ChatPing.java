package com.momo.chat.entity;

import com.momo.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.BatchSize;

import javax.persistence.*;
import java.time.LocalDateTime;

@Getter
@Entity
@NoArgsConstructor
public class ChatPing {
    @Id
    @GeneratedValue
    private Long id;

    @BatchSize(size = 1000)
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    private Long lastPing;

    @Builder
    public ChatPing(Member member, Long lastPing) {
        this.member = member;
        this.lastPing = lastPing;
    }

    public void updatePing(Long ping) {
        this.lastPing = ping;
    }
}
