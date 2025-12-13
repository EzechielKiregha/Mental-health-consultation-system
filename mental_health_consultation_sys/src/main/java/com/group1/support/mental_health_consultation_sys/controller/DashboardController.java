package com.group1.support.mental_health_consultation_sys.controller;


import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group1.support.mental_health_consultation_sys.dto.DashboardStatsDto;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.DashboardService;
import com.group1.support.mental_health_consultation_sys.util.getLoggedUser;

import jakarta.servlet.http.HttpServletRequest;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/dashboard")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @Autowired
    private getLoggedUser loggedUser;

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDto> getStats(HttpServletRequest request) {
        var user = loggedUser.CurrentLoggedInUser(request);
        if (user == null) {
            return ResponseEntity.status(401).build();
        }
        DashboardStatsDto stats = dashboardService.getStats(user.getId());
        return ResponseEntity.ok(stats);
    }

    // 1) Users by role
    @GetMapping("/users-by-role")
    public ResponseEntity<Map<String, Long>> getUsersByRole() {
        Map<String, Long> counts = dashboardService.countUsersByRole();
        return ResponseEntity.ok(counts);
    }

    // 2) Resources breakdown
    @GetMapping("/resources-breakdown")
    public ResponseEntity<Map<String, Long>> getResourcesBreakdown() {
        Map<String, Long> counts = dashboardService.countResourcesByType();
        return ResponseEntity.ok(counts);
    }

    // 3) Appointment trends for last N months
    @GetMapping("/trends/appointments")
    public ResponseEntity<List<Map<String, Object>>> getAppointmentTrends(
            @RequestParam(defaultValue = "6") int months) {
        List<Map<String,Object>> data = dashboardService.monthlyAppointmentTrends(months);
        return ResponseEntity.ok(data);
    }

    // returns a list of all users with the PATIENT role
    @GetMapping("/patients")
    public ResponseEntity<List<User>> getPatients() {
        List<User> pts = dashboardService.findPatients();
        return ResponseEntity.ok(pts);
    }

}
