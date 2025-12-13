package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.support.mental_health_consultation_sys.model.Appointment;
import com.group1.support.mental_health_consultation_sys.model.Status;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    List<Appointment> findByTherapistIdAndAppointmentTimeBetween(Long therapistId, LocalDateTime start, LocalDateTime end);
    List<Appointment> findByUserId(Long userId);
    List<Appointment> findByTherapistId(Long therapistId);
    long countByAppointmentTimeAfter(LocalDateTime dateTime);

    long countByAppointmentTimeBetween(LocalDateTime start, LocalDateTime end);
    long countByAppointmentTimeBetweenAndStatus(LocalDateTime start, LocalDateTime end, Status status);
}

