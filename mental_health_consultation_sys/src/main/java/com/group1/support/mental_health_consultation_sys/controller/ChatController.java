package com.group1.support.mental_health_consultation_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.model.ChatMessage;
import com.group1.support.mental_health_consultation_sys.model.ChatSession;
import com.group1.support.mental_health_consultation_sys.service.ChatMessageService;
import com.group1.support.mental_health_consultation_sys.service.ChatSessionService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/chat")
public class ChatController {

    @Autowired
    private ChatSessionService chatSessionService;
    
    @Autowired
    private ChatMessageService chatMessageService;

    @PostMapping("/start")
    public ChatSession startChat(@RequestParam Long userId, @RequestParam(required = false) Long therapistId) {
        ChatSession session = chatSessionService.resumeChatSession(userId, therapistId);
        if (session == null) {
            session = chatSessionService.startSession(userId, therapistId);
        }
        return session;
    }

    @PostMapping("/{sessionId}/message")
    public ChatMessage sendMessage(@PathVariable Long sessionId, @RequestParam String sender, @RequestParam String text) {
        ChatSession session = chatSessionService.getChatSession(sessionId); // Replace with actual session retrieval logic
        return chatMessageService.sendMessage(session, sender, text);
    }

    @GetMapping("/{sessionId}")
    public ResponseEntity<?> getMessageHistory(@PathVariable Long sessionId) {
        ChatSession session = chatSessionService.getChatSession(sessionId); // Replace with actual session retrieval logic
        if (session == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(chatMessageService.getMessageHistory(session));
    }

    @GetMapping("/get-sessions/{userId}")
    public ResponseEntity<?> getAllSessionsByUserId(@PathVariable Long userId) {
        return ResponseEntity.ok(chatSessionService.getAllSessionsByUserId(userId));
    }

}
