package com.momo.chat.repository;

import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.Message;
import com.momo.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByChatroomOrderBySentTime(Chatroom chatroom);

    void deleteByChatroom(Chatroom chatroom);
}
