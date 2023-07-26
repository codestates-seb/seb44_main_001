package com.momo.chat.repository;

import com.momo.chat.entity.ChatPing;
import com.momo.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ChatPingRepository extends JpaRepository<ChatPing, Long> {
    Optional<ChatPing> findByMember(Member member);

    @Query(value = "select cp from ChatPing cp where cp.lastPing <= :now - 30000L")
    List<ChatPing> getPingNotUpdated(Long now);
}
