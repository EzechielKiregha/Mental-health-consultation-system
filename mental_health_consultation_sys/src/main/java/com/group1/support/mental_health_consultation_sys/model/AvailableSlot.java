package com.group1.support.mental_health_consultation_sys.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AvailableSlot {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "therapist_profile_id", nullable = false)
    private TherapistProfile therapistProfile;

    @Column(nullable = false)
    private String day;

    @Column(nullable = false)
    private String timeSlot;
}
