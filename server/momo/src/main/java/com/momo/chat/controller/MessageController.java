package com.momo.chat.controller;


import com.momo.chat.dto.MessageDto;
import com.momo.chat.interceptor.MemberInterceptor;
import com.momo.chat.service.ChatroomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/chats")
@RequiredArgsConstructor
public class MessageController {
    private final ChatroomService chatroomService;

    @PostMapping
    public ResponseEntity sendMessage(@RequestBody MessageDto messageDto) {
        Long memberId = MemberInterceptor.currentMemberStore.get();
        Long roomId = messageDto.getRoomId();
        String content = messageDto.getContent();

        chatroomService.sendMessage(memberId, roomId, content);
        return new ResponseEntity(HttpStatus.OK);
    }
}
