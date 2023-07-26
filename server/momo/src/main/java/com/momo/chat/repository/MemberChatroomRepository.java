package com.momo.chat.repository;

import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import com.momo.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberChatroomRepository extends JpaRepository<MemberChatroom, Long> {

    @Query(value =
            "select mc from MemberChatroom mc " +
            "join fetch mc.chatroom c " +
            "where mc.member = :member " +
            "order by c.lastMessageSentTime desc")
    List<MemberChatroom> getRooms(Member member);

    @Query(value = "select mc from MemberChatroom mc " +
            "join fetch mc.chatroom c " +
            "where mc.chatroom = :chatroom")
    List<MemberChatroom> getMemberChatrooms(Chatroom chatroom);
    MemberChatroom findByChatroomAndMember(Chatroom chatroom, Member member);

    List<MemberChatroom> findAllByMember_MemberId(Long memberId);

    List<MemberChatroom> findByMember(Member member);

    List<MemberChatroom> findByRoomNameAndChatroom_RoomType(String names, Chatroom.RoomType roomType);



    void deleteByChatroom(Chatroom chatroom);
}
