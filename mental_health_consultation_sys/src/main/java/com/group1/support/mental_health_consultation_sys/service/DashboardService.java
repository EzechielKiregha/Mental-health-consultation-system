package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.dto.DashboardStatsDto;
import com.group1.support.mental_health_consultation_sys.model.ResourceType;
import com.group1.support.mental_health_consultation_sys.model.Status;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.AppointmentRepository;
import com.group1.support.mental_health_consultation_sys.repository.MentalHealthResourceRepository;
import com.group1.support.mental_health_consultation_sys.repository.SelfCheckResultRepository;
import com.group1.support.mental_health_consultation_sys.repository.UserRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.YearMonth;
import java.time.format.TextStyle;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private MentalHealthResourceRepository resourceRepository;

    @Autowired
    private SelfCheckResultRepository selfCheckResultRepository;

    @Autowired private UserRepository userRepo;
    @Autowired private MentalHealthResourceRepository resourceRepo;
    @Autowired private AppointmentRepository appointmentRepo;

    public DashboardStatsDto getStats(Long userId) {
        long totalAppointments = appointmentRepository.count();
        long upcomingAppointments = appointmentRepository.countByAppointmentTimeAfter(LocalDateTime.now());
        long savedResources = resourceRepository.countBySavedByUserId(userId);
        long selfCheckCount = selfCheckResultRepository.countByUserId(userId);

        return new DashboardStatsDto(totalAppointments, upcomingAppointments, savedResources, selfCheckCount);
    }

    // 1) Users by role
    public Map<String, Long> countUsersByRole() {
        Map<String, Long> m = new HashMap<>();
        m.put("patients", userRepo.countByRoles_Name("ROLE_PATIENT"));
        m.put("therapists", userRepo.countByRoles_Name("ROLE_THERAPIST"));
        m.put("admins", userRepo.countByRoles_Name("ROLE_ADMIN"));
        m.put("moderators", userRepo.countByRoles_Name("ROLE_MODERATOR"));
        return m;
    }

    // 2) Resources by type
    public Map<String, Long> countResourcesByType() {
        Map<String, Long> m = new HashMap<>();
        m.put("articles", resourceRepo.countByResourceType(ResourceType.ARTICLE));
        m.put("guides",   resourceRepo.countByResourceType(ResourceType.GUIDE));
        m.put("exercises",resourceRepo.countByResourceType(ResourceType.EXERCISE));
        return m;
    }

    // 3) Appointment trends (last N months)
    public List<Map<String,Object>> monthlyAppointmentTrends(int monthsBack) {
        List<Map<String,Object>> result = new ArrayList<>();
        LocalDate today = LocalDate.now();
        for (int i = monthsBack - 1; i >= 0; i--) {
            YearMonth ym = YearMonth.from(today).minusMonths(i);
            LocalDateTime start = ym.atDay(1).atStartOfDay();
            LocalDateTime end   = ym.atEndOfMonth().atTime(23,59,59);
            long scheduled = appointmentRepo.countByAppointmentTimeBetween(start, end);
            long completed = appointmentRepo.countByAppointmentTimeBetweenAndStatus(start, end, Status.COMPLETED);
            long cancelled = appointmentRepo.countByAppointmentTimeBetweenAndStatus(start, end, Status.CANCELLED);
            Map<String,Object> monthData = new HashMap<>();
            monthData.put("month", ym.getMonth().getDisplayName(TextStyle.SHORT, Locale.ENGLISH));
            monthData.put("scheduled", scheduled);
            monthData.put("completed", completed);
            monthData.put("cancelled", cancelled);
            result.add(monthData);
        }
        return result;
    }

    public List<User> findPatients() {
        return userRepo.findAllByRoles_Name("PATIENT")
                       .stream()
                       .map(User::fromEntity)
                       .toList();
                    // .collect(Collectors.toList());
    }
    
}
