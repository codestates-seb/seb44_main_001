package com.momo.chat.repository;

import com.momo.chat.entity.MemberChatroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberChatroomRepository extends JpaRepository<MemberChatroom, Long> {

    @Query(value = "select mc from MemberChatroom mc " +
            "join fetch mc.chatroom c " +
            "where mc.member.memberId = :memberId " +
            "order by c.lastMessageSentTime desc")
    List<MemberChatroom> getRooms(Long memberId);
}
