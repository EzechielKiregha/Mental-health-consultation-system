package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.SelfCheckResult;

import java.util.List;

public interface SelfCheckResultRepository extends JpaRepository<SelfCheckResult, Long> {
    List<SelfCheckResult> findByUserId(Long userId);
    long countByUserId(Long userId);
}
