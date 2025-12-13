package com.group1.support.mental_health_consultation_sys.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class MentalHealthResource {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ResourceType resourceType;

    @Column(nullable=false)
    private Integer questionIndex;

    @ManyToOne
    @JoinColumn(name = "therapist_id")
    @JsonBackReference("therapist-resources") // Matches User's "therapist-resources"
    private User therapist;
}
