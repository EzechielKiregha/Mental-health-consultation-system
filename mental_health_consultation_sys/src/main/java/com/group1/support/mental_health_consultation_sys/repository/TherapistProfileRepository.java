package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.TherapistProfile;

public interface TherapistProfileRepository extends JpaRepository<TherapistProfile, Long> {
    TherapistProfile findByUserId(Long userId);
}
