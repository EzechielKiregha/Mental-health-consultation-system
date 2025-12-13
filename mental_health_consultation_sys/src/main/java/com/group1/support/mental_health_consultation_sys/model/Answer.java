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
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "self_check_result_id", nullable = false)
    private SelfCheckResult selfCheckResult;

    @Column(nullable = false)
    private int questionIndex;

    @Column(nullable = false)
    private int answerValue;
}
