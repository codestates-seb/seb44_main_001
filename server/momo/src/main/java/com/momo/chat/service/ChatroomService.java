package com.momo.chat.service;

import com.momo.chat.dto.MessageResponseDto;
import com.momo.chat.entity.ChatPing;
import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import com.momo.chat.entity.Message;
import com.momo.chat.repository.ChatroomRepository;
import com.momo.chat.repository.MemberChatroomRepository;
import com.momo.chat.repository.ChatPingRepository;
import com.momo.chat.repository.MessageRepository;
import com.momo.comment.dto.MemberInfo;
import com.momo.exception.BusinessLogicException;
import com.momo.exception.ExceptionCode;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@RequiredArgsConstructor
@Transactional
public class ChatroomService {
    private final MemberRepository memberRepository;
    private final MemberChatroomRepository memberChatroomRepository;
    private final ChatroomRepository chatroomRepository;
    private final MessageRepository messageRepository;
    private final ChatPingRepository chatPingRepository;
    private final SimpMessagingTemplate template;

    public Chatroom createChatroom(Long memberId, Long otherMemberId, String roomName, String roomType) {
        LocalDateTime now = LocalDateTime.now();
        String newMessage = "새 채팅방이 생성되었습니다.";

        Member member = memberRepository.findById(memberId).get();
        Chatroom chatroom = Chatroom.from("new chatroom", newMessage, now, roomType);
        chatroom.addRoomKing(member);
        chatroom.addMemberCount();
        Chatroom savedChatroom = chatroomRepository.save(chatroom);

        Message message = Message.from(newMessage, member, savedChatroom, now, roomType);
        messageRepository.save(message);

        if (roomType.equals(Chatroom.RoomType.PERSONAL.getType())) {
            verifyPersonalDuplicateRoom(memberId, otherMemberId);
            chatroom.addMemberCount();
            chatroomRepository.save(savedChatroom);

            Member otherMember = memberRepository.findById(otherMemberId).get();
            MemberChatroom memberChatRoom = MemberChatroom.from(member, savedChatroom, otherMember.getNickname(), now);
            MemberChatroom memberChatRoom2 = MemberChatroom.from(otherMember, savedChatroom, member.getNickname(), now);
            memberChatroomRepository.save(memberChatRoom);
            memberChatroomRepository.save(memberChatRoom2);

        } else if (roomType.equals(Chatroom.RoomType.GROUP.getType())) {
            chatroom.changeName(roomName);
            MemberChatroom memberChatRoom = MemberChatroom.from(member, savedChatroom, roomName, now);
            memberChatroomRepository.save(memberChatRoom);
        }
        return savedChatroom;
    }

    private void verifyPersonalDuplicateRoom(Long memberId, Long otherMemberId) {
        if (memberId.equals(otherMemberId)) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_DUPLICATED);
        }
        List<MemberChatroom> chatrooms = memberChatroomRepository.findAllByMember_MemberId(memberId);
        List<MemberChatroom> chatrooms2 = memberChatroomRepository.findAllByMember_MemberId(otherMemberId);
        Optional<MemberChatroom> first = chatrooms.stream()
                .filter(cr -> {
                    long count = chatrooms2.stream()
                            .filter(cr2 -> cr.getChatroom().equals(cr2.getChatroom()))
                            .count();
                    return count > 0;
                })
                .findFirst();
        if (first.isPresent()) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_DUPLICATED);
        }
    }

    public void inviteMember(Long otherMemberId, Long roomId) {
        Chatroom chatroom = chatroomRepository.findById(roomId).get();
        Member otherMember = memberRepository.findById(otherMemberId).get();
        LocalDateTime now = LocalDateTime.now();
        String message = otherMember.getNickname() + "님이 입장하셨습니다.";

        verifyGroupDuplicateInvitation(chatroom, otherMember);

        chatroom.updateLastMessage(message, now);
        chatroom.addMemberCount();
        MemberChatroom memberChatRoom = MemberChatroom.from(otherMember, chatroom, chatroom.getName(), now);
        memberChatroomRepository.save(memberChatRoom);

        Message newMessage = Message.from(message, otherMember, chatroom, now, Message.ParticipantType.NOTIFICATION.toString());
        Message savedMessage = messageRepository.save(newMessage);

        template.convertAndSend("/sub/chat/room/" + roomId, MessageResponseDto.from(savedMessage));
    }

    private void verifyGroupDuplicateInvitation(Chatroom chatroom, Member otherMember) {
        MemberChatroom memberChatroom = memberChatroomRepository.findByChatroomAndMember(chatroom, otherMember);
        if (memberChatroom != null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_ALREADY_IN_ROOM);
        }
    }

    public List<MemberChatroom> getRooms(Long memberId) {
        Member member = memberRepository.findById(memberId).get();

        List<MemberChatroom> memberChatRooms = memberChatroomRepository.getRooms(member);

        Optional<ChatPing> optionalChatPing = chatPingRepository.findByMember(member);
        if (optionalChatPing.isEmpty()) {
            ChatPing ping = ChatPing.builder()
                    .member(member)
                    .lastPing(System.currentTimeMillis())
                    .build();
            chatPingRepository.save(ping);
        } else {
            ChatPing chatPing = optionalChatPing.get();
            chatPing.updatePing(System.currentTimeMillis());
            chatPingRepository.save(chatPing);
        }


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
        String message = member.getNickname() + "님이 퇴장하셨습니다.";
        LocalDateTime now = LocalDateTime.now();

        chatroom.subMemberCount();
        Message newMessage = Message.from(message, member, chatroom, now, Message.ParticipantType.NOTIFICATION.toString());
        Message savedMessage = messageRepository.save(newMessage);
        template.convertAndSend("/sub/chat/room/" + chatroom.getChatroomId(), MessageResponseDto.from(savedMessage));

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

    public List<MemberInfo> getMembers(Long roomId) {
        List<Member> membersInRoom = memberChatroomRepository.findMembersInRoom(roomId).stream()
                .map(memberChatroom -> memberChatroom.getMember())
                .collect(Collectors.toList());
        return membersInRoom.stream()
                .map(member -> MemberInfo.from(member))
                .collect(Collectors.toList());
    }
}
