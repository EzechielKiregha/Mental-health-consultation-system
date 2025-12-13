package com.group1.support.mental_health_consultation_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.model.TherapistProfile;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.TherapistProfileService;
import com.group1.support.mental_health_consultation_sys.service.UserService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/therapists-profiles")
public class TherapistProfileController {
    @Autowired
    private TherapistProfileService service;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<TherapistProfile> listAll() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable Long id) {
        if (service.findByUserId(id) == null) {
            return ResponseEntity.ok().body("{\"message\": \"NO FOUND\"}");
        }
        return ResponseEntity.ok(service.findByUserId(id));
    }

    @PostMapping
    public TherapistProfile create(@RequestBody TherapistProfile profile, @RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            profile.setUser(user.get());
        } else {
            throw new RuntimeException("User not found");
        }
        return service.save(profile);
    }

    @PutMapping("/{userId}")
    public ResponseEntity<TherapistProfile> update(@PathVariable Long userId, @RequestBody TherapistProfile profile) {
        if (service.findByUserId(userId) == null) {
            return ResponseEntity.ok(create(profile, userId));
        }
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            profile.setUser(user.get());
        } else {
            throw new RuntimeException("User not found");
        }
        return ResponseEntity.ok(service.save(profile));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        if (!service.findById(id).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        service.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
