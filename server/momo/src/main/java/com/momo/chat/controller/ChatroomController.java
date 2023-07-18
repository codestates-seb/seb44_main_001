package com.momo.chat.controller;


import com.momo.chat.dto.ChatroomRegisterDto;
import com.momo.chat.dto.RoomResponseDto;
import com.momo.chat.dto.RoomsDto;
import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import com.momo.chat.entity.Message;
import com.momo.chat.interceptor.MemberInterceptor;
import com.momo.chat.repository.ChatroomRepository;
import com.momo.chat.repository.MemberChatroomRepository;
import com.momo.chat.repository.MessageRepository;
import com.momo.member.entity.Member;
import com.momo.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;
@RestController
@RequiredArgsConstructor
@RequestMapping("/chats")
public class ChatroomController {
    private final MemberRepository memberRepository;
    private final MemberChatroomRepository memberChatroomRepository;
    private final ChatroomRepository chatroomRepository;
    private final MessageRepository messageRepository;

//    @GetMapping
//    public String hello(){
//        return "hello";
//    }
    @PostMapping("/register")
    public ResponseEntity createRoom(@RequestBody ChatroomRegisterDto chatroomRegisterDto) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        LocalDateTime now = LocalDateTime.now();

        Member member = memberRepository.findById(memberId).get();
        Member otherMember = memberRepository.findById(chatroomRegisterDto.getMemberId()).get();

        Chatroom chatroom = Chatroom.builder()
                .lastMessage("새 채팅방이 생성되었습니다!")
                .lastMessageSentTime(now)
                .build();

        Message message = Message.builder()
                .message("새 채팅방이 생성되었습니다!")
                .member(member)
                .chatroom(chatroom)
                .sentTime(now)
                .build();

        chatroomRepository.save(chatroom);
        messageRepository.save(message);

        MemberChatroom memberChatRoom = MemberChatroom.builder()
                .member(member)
                .other(otherMember)
                .chatroom(chatroom)
                .build();

        MemberChatroom memberChatRoom2 = MemberChatroom.builder()
                .member(otherMember)
                .other(member)
                .chatroom(chatroom)
                .build();

        memberChatroomRepository.save(memberChatRoom);
        memberChatroomRepository.save(memberChatRoom2);
        return new ResponseEntity(chatroom.getChatroomId(), HttpStatus.OK);
    }
//
    @GetMapping
    public ResponseEntity getRooms() {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        List<MemberChatroom> memberChatRooms = memberChatroomRepository.getRooms(memberId);
        List<RoomResponseDto> roomResponseDtos = memberChatRooms.stream()
                .map(memberChatRoom -> RoomResponseDto.from(memberChatRoom.getChatroom(), memberChatRoom.getOther().getNickname()))
                .collect(Collectors.toList());
        return new ResponseEntity(RoomsDto.builder()
                        .rooms(roomResponseDtos)
                        .build(),
                HttpStatus.OK);
    }


}
