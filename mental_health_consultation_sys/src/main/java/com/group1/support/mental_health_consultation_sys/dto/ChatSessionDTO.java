package com.group1.support.mental_health_consultation_sys.dto;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChatSessionDTO {
    private Long id;
    private String userName;
    private String therapistName;
    private LocalDateTime startedAt;
    private String lastMessage;

    public ChatSessionDTO(Long id, String userName, String therapistName, LocalDateTime startedAt, String lastMessage) {
        this.id = id;
        this.userName = userName;
        this.therapistName = therapistName;
        this.startedAt = startedAt;
        this.lastMessage = lastMessage;
    }
}
