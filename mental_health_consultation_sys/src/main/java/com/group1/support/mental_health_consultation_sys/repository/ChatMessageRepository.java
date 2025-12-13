package com.group1.support.mental_health_consultation_sys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.ChatMessage;
import com.group1.support.mental_health_consultation_sys.model.ChatSession;


public interface ChatMessageRepository extends JpaRepository<ChatMessage, Long> {
  List<ChatMessage> findAllBySession(ChatSession session);
}
