package com.momo.chat.controller;

import com.momo.chat.dto.*;
import com.momo.chat.entity.Chatroom;
import com.momo.chat.entity.MemberChatroom;
import com.momo.chat.entity.Message;
import com.momo.chat.interceptor.MemberInterceptor;
import com.momo.chat.service.ChatroomService;
import com.momo.comment.dto.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
@RequestMapping("/rooms")
public class ChatroomController {
    private final ChatroomService chatroomService;

    @PostMapping("/register")
    public Long createRoom(@RequestBody ChatroomRegisterDto chatroomRegisterDto) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        Long otherMemberId = chatroomRegisterDto.getMemberId();
        String roomName = chatroomRegisterDto.getRoomName();
        String roomType = chatroomRegisterDto.getRoomType();

        Chatroom chatroom = chatroomService.createChatroom(memberId, otherMemberId, roomName, roomType);

        return chatroom.getChatroomId();
    }

    @PostMapping("/invite")
    public ResponseEntity inviteMember(@RequestBody ChatroomInviteDto inviteDto) {
        Long roomId = inviteDto.getRoomId();
        Long otherMemberId = inviteDto.getMemberId();

        chatroomService.inviteMember(otherMemberId, roomId);
        return ResponseEntity.ok().build();
    }
//
    @GetMapping("/list")
    public RoomsDto getRooms() {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        List<MemberChatroom> rooms = chatroomService.getRooms(memberId);

        List<RoomResponseDto> roomResponseDtos = rooms.stream()
                .map(memberChatRoom -> RoomResponseDto.from(memberChatRoom))
                .collect(Collectors.toList());

        return RoomsDto.builder()
                        .rooms(roomResponseDtos)
                        .build();
    }

    @PostMapping("/{roomId}/online")
    public ResponseEntity setOnline(@PathVariable Long roomId) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        chatroomService.setOnline(memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{roomId}/offline")
    public ResponseEntity setOffline(@PathVariable Long roomId) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        chatroomService.setOffline(memberId, roomId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{roomId}")
    public ChatMessagesDto getMessages(@PathVariable Long roomId) {
        List<Message> messages = chatroomService.getMessages(roomId);

        List<MessageResponseDto> messageSendDtos = messages.stream()
                .map(message -> MessageResponseDto.from(message))
                .collect(Collectors.toList());
        return ChatMessagesDto.builder()
                .chats(messageSendDtos)
                .build();
    }

    @GetMapping("/{roomId}/members")
    public List<MemberInfo> getMembersInRoom(@PathVariable Long roomId) {
        return chatroomService.getMembers(roomId);
    }

    @DeleteMapping("/{roomId}")
    public ResponseEntity getOut(@PathVariable Long roomId) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        chatroomService.getoutRoom(memberId, roomId);

        return ResponseEntity.ok().build();
    }

}
