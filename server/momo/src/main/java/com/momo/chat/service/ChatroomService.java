package com.momo.chat.service;

import com.momo.chat.dto.MessageResponseDto;
import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import com.momo.chat.entity.Message;
import com.momo.chat.repository.ChatroomRepository;
import com.momo.chat.repository.MemberChatroomRepository;
import com.momo.chat.repository.MessageRepository;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatroomService {
    private final MemberRepository memberRepository;
    private final MemberChatroomRepository memberChatroomRepository;
    private final ChatroomRepository chatroomRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate template;

    public Chatroom createChatroom(Long memberId, Long otherMemberId, String roomType) {
        LocalDateTime now = LocalDateTime.now();
        String newMessage = "새 채팅방이 생성되었습니다.";

        Member member = memberRepository.findById(memberId).get();
        Member otherMember = memberRepository.findById(otherMemberId).get();

        Chatroom chatroom = Chatroom.from("new chatroom", newMessage, now, roomType);
        chatroom.addRoomKing(member);
        Chatroom savedChatroom = chatroomRepository.save(chatroom);

        Message message = Message.from(newMessage, member, savedChatroom, now, roomType);
        messageRepository.save(message);

        MemberChatroom memberChatRoom = MemberChatroom.from(member, savedChatroom, otherMember.getNickname());
        MemberChatroom memberChatRoom2 = MemberChatroom.from(otherMember, savedChatroom, member.getNickname());
        memberChatroomRepository.save(memberChatRoom);
        memberChatroomRepository.save(memberChatRoom2);

        return savedChatroom;
    }

    public List<MemberChatroom> getRooms(Long memberId) {
        Member member = memberRepository.findById(memberId).get();

        List<MemberChatroom> memberChatRooms = memberChatroomRepository.getRooms(member);

        return memberChatRooms;
    }

    public void setOnline(Long memberId, Long roomId) {
        Member member = memberRepository.findById(memberId).get();
        Chatroom chatroom = chatroomRepository.findById(roomId).get();
        MemberChatroom memberChatroom = memberChatroomRepository.findByChatroomAndMember(chatroom, member);
        memberChatroom.setOnline();
        memberChatroomRepository.save(memberChatroom);
    }

    public void setOffline(Long memberId, Long roomId) {
        Member member = memberRepository.findById(memberId).get();
        Chatroom chatroom = chatroomRepository.findById(roomId).get();
        MemberChatroom memberChatroom = memberChatroomRepository.findByChatroomAndMember(chatroom, member);
        memberChatroom.setOffline();
        memberChatroomRepository.save(memberChatroom);
    }

    public List<Message> getMessages(Long roomId) {
        Chatroom chatroom = chatroomRepository.findById(roomId).get();

        List<Message> messages = messageRepository.findAllByChatroomOrderBySentTime(chatroom);

        return messages;
    }

    public void getoutRoom(Long memberId, Long roomId) {
        Member member = memberRepository.findById(memberId).get();
        Chatroom chatroom = chatroomRepository.findById(roomId).get();
        List<MemberChatroom> memberChatrooms = memberChatroomRepository.getMemberChatrooms(chatroom);
        int curSize = memberChatrooms.size();

        MemberChatroom memberChatroom = memberChatrooms.stream()
                .filter(mc -> mc.getMember().equals(member))
                .findFirst().get();
        memberChatroomRepository.delete(memberChatroom);

        if (curSize == 1) {
            messageRepository.deleteByChatroom(chatroom);
            chatroomRepository.delete(chatroom);
        }
    }

    public void sendMessage(Long memberId, Long roomId, String content) {
        Member member = memberRepository.findById(memberId).get();
        LocalDateTime now = LocalDateTime.now();

        Chatroom chatroom = chatroomRepository.findById(roomId).get();
        chatroom.updateLastMessage(content, now);

        List<MemberChatroom> memberChatrooms = memberChatroomRepository.getMemberChatrooms(chatroom);
        memberChatrooms.stream()
                .filter(mc -> mc.getChatStatus().equals(MemberChatroom.ChatStatus.OFFLINE))
                .forEach(mc -> mc.addUnreadCount());

        Message message = Message.from(content, member, chatroom, now, Message.ParticipantType.MEMBER.toString());

        Message savedMessage = messageRepository.save(message);

        template.convertAndSend("/sub/chat/room/" + chatroom.getChatroomId(), MessageResponseDto.from(savedMessage));
    }
}
