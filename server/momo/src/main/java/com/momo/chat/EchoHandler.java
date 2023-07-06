package com.momo.chat;

import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;

public class EchoHandler extends TextWebSocketHandler {
    private final Chatroom chatroom;

    public EchoHandler(Chatroom chatroom) {
        this.chatroom = chatroom;
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        if (!chatroom.sessions.contains(session))
            chatroom.sessions.add(session);
        chatroom.sessions.stream()
                .forEach(sess -> {
                    try {
                        sess.sendMessage(new TextMessage(message.getPayload()));
                    } catch (IOException e) {
                        throw new RuntimeException(e);
                    }
                });
    }
}
