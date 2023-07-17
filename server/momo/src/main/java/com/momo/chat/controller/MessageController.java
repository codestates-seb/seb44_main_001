package com.momo.chat.controller;


import com.momo.chat.dto.ChatMessagesDto;
import com.momo.chat.dto.MessageDto;
import com.momo.chat.dto.MessageSendDto;
import com.momo.chat.entity.Chatroom;
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
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class MessageController {
    private final MemberRepository memberRepository;
    private final MemberChatroomRepository memberChatroomRepository;
    private final ChatroomRepository chatroomRepository;
    private final MessageRepository messageRepository;
    private final SimpMessagingTemplate template;

    @PostMapping
    public ResponseEntity sendMessage(@RequestBody MessageDto messageDto) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        Member member = memberRepository.findById(memberId).get();

        Chatroom chatroom = chatroomRepository.findById(messageDto.getRoomId()).get();

        Message message = Message.builder()
                .message(messageDto.getContent())
                .member(member)
                .chatroom(chatroom)
                .sentTime(LocalDateTime.now())
                .build();

        Message savedMessage = messageRepository.save(message);
        chatroom.addMessage(savedMessage);
        chatroomRepository.save(chatroom);

        template.convertAndSend("/sub/chat/room/" + chatroom.getChatroomId(), MessageSendDto.from(savedMessage));
        return new ResponseEntity(HttpStatus.OK);
    }

    @GetMapping("/{roomId}")
    public ChatMessagesDto getMessages(@PathVariable Long roomId) {
        Chatroom chatroom = chatroomRepository.findById(roomId).get();

        List<Message> messages = messageRepository.findAllByChatroomOrderBySentTime(chatroom);
        List<MessageSendDto> messageSendDtos = messages.stream()
                .map(message -> MessageSendDto.from(message))
                .collect(Collectors.toList());
        return ChatMessagesDto.builder()
                .chats(messageSendDtos)
                .build();
    }
}
