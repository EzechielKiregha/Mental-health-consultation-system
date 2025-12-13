package com.group1.support.mental_health_consultation_sys.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Entity
@Getter
@Setter
@Table(name = "self_check_results")
public class SelfCheckResult {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    @JsonBackReference("user-self-check-result") // Matches User's "user-self-check-result"
    private User user;

    @Column(nullable = false)
    private int score;

    @Column(nullable = false)
    private List<Long> recommendedResourceIds;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String answersJson; // Assuming answers is a JSON string

    @Column(nullable = false)
    private List<Integer> answers; // Assuming answers is a JSON array of integers

    @Column(nullable = false)
    private Instant takenAt;
}
