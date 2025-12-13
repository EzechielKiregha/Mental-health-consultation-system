package com.group1.support.mental_health_consultation_sys.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class TherapistProfile {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-therapist-profile") // Matches User's "user-therapist-profile"
    private User user;

    @Column(nullable = false)
    private String specialty;

    @Column(length = 1000)
    private String bio;

    private String photoUrl;

    @Column(columnDefinition = "TEXT")
    private String availableSlots; // Stored as JSON string
}
