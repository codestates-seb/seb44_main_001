package com.example.websocketex;


import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Component
public class Chatroom {
    Set<WebSocketSession> sessions = new HashSet<>();



}
