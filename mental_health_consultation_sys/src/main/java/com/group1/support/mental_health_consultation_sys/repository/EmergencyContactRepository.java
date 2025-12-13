package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.EmergencyContact;


public interface EmergencyContactRepository extends JpaRepository<EmergencyContact, Long> {
}
