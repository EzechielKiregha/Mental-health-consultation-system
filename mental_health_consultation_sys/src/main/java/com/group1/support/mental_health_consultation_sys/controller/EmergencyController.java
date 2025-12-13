package com.group1.support.mental_health_consultation_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.group1.support.mental_health_consultation_sys.model.EmergencyContact;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.EmergencyContactRepository;
import com.group1.support.mental_health_consultation_sys.service.UserService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/emergency")
public class EmergencyController {

    @Autowired
    private EmergencyContactRepository emergencyContactRepository;

    @Autowired
    private UserService userService;

    @GetMapping
    public List<EmergencyContact> listAllContacts() {
        return emergencyContactRepository.findAll();
    }

    @PostMapping("/new-contact-line")
    public ResponseEntity<EmergencyContact> addContact(@RequestBody EmergencyContact emergencyContact, @RequestParam Long userId) {
        Optional<User> user = userService.getUserById(userId);
        if (user.isPresent()) {
            emergencyContact.setUser(user.get());
        }else {
            throw new RuntimeException("[No User ID provided]");
        }
        return ResponseEntity.ok(emergencyContactRepository.save(emergencyContact));
    }
}
