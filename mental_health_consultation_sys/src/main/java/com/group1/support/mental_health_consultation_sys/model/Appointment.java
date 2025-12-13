package com.group1.support.mental_health_consultation_sys.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-appointments") // Matches User's "user-appointments"
    private User user;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    @JsonBackReference("therapist-appointments") // Matches User's "therapist-appointments"
    private User therapist;

    @Column(nullable = false)
    private LocalDateTime appointmentTime;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Status status;
}
