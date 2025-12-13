package com.group1.support.mental_health_consultation_sys.controller;

import com.group1.support.mental_health_consultation_sys.model.*;
import com.group1.support.mental_health_consultation_sys.repository.AppointmentRepository;
import com.group1.support.mental_health_consultation_sys.service.AppointmentService;
import com.group1.support.mental_health_consultation_sys.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.time.format.DateTimeParseException;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;


    @Autowired
    private UserService userService;

    @Autowired
    private AppointmentService appointmentService;

    @GetMapping
    public ResponseEntity<?> viewAppointments(@RequestParam long userId) {
        
        Optional<User> optionalUser = userService.getUserById(userId);
        if (!optionalUser.isPresent()) {
            return ResponseEntity.ok().body("{\"message\":\"Patient ID Is Missing\"}");
        }
        User user = optionalUser.get();
        boolean isPatient = user.getRoles().stream().anyMatch(role -> role.getName().equals("PATIENT"));
        boolean isTherapist = user.getRoles().stream().anyMatch(role -> role.getName().equals("THERAPIST"));

        List<Appointment> appointments;

        if (isPatient) {
            appointments = appointmentService.getAppointmentsByUserId(userId);
        } else if (isTherapist) {
            appointments = appointmentService.getAppointmentsByTherapistId(userId);
        } else {
            return ResponseEntity.ok().body("{\"error\": \"NO FOUND\"}");
        }

        return ResponseEntity.ok(appointments);
    }

    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestParam Long userId, @RequestParam Long therapistId, @RequestParam String appointmentTime) {
        Optional<User> user = userService.getUserById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.ok().body("{\"message\":\"Patient ID Is Missing\"}");
        }

        Optional<User> therapist = userService.getUserById(therapistId);
        if (!therapist.isPresent()) {
            return ResponseEntity.ok().body("{\"message\":\"Therapist ID Is Missing\"}");
        }

        // Define a formatter to parse the ISO-8601 string with timezone
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSX");
        LocalDateTime dateTime;
        try {
            dateTime = ZonedDateTime.parse(appointmentTime, formatter).toLocalDateTime();
        } catch (DateTimeParseException e) {
            return ResponseEntity.badRequest().body("{\"message\":\"Invalid date format. Please use ISO-8601 format with timezone.\"}");
        }

        Appointment appointment = new Appointment();
        appointment.setUser(user.get());
        appointment.setTherapist(therapist.get());
        appointment.setAppointmentTime(dateTime);
        appointment.setStatus(Status.SCHEDULED);

        appointmentRepository.save(appointment);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("/update-status")
    public ResponseEntity<?> updateAppointmentStatus(@RequestParam Long appointmentId, @RequestParam Status status, @RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (!user.isPresent()) {
            return ResponseEntity.ok().body("{\"message\":\"Patient ID Is Missing\"}");
        }
        Appointment appointment = appointmentRepository.findById(appointmentId).orElseThrow();
        if (status.equals(Status.SCHEDULED)){
            appointment.setStatus(Status.SCHEDULED);
        } else if (status.equals(Status.CANCELLED)) {
            appointment.setStatus(Status.CANCELLED);
        } else if (status.equals(Status.COMPLETED)) {
            appointment.setStatus(Status.COMPLETED);
        } else {
            return ResponseEntity.status(400).body("{\"error\": \"Invalid status\"}");
        }
        
        appointmentRepository.save(appointment);

        return ResponseEntity.ok(appointment);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteAppointment(@PathVariable Long id, @RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if(!user.isPresent()){
            ResponseEntity.ok().body("{\"message\":\"Patient ID Is Missing\"}");
        }
        Appointment appointment = appointmentRepository.findById(id).orElseThrow();
        if (!appointment.getUser().getId().equals(userId)) {
            return ResponseEntity.status(403).body("{\"error\": \"Forbidden\"}");
        }

        appointmentService.deleteAppointment(id);
        return ResponseEntity.ok("{\"message\": \"Appointment deleted successfully\"}");
    }
}
