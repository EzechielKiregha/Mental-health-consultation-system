package com.group1.support.mental_health_consultation_sys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.ChatSession;

public interface ChatSessionRepository extends JpaRepository<ChatSession, Long> {
  List<ChatSession> findAllByUserId(Long id);
}
