package com.group1.support.mental_health_consultation_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.model.Role;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.RoleRepository;
import com.group1.support.mental_health_consultation_sys.service.UserService;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private RoleRepository roleRepository;

    @GetMapping
    public List<User> getAllUsers() {

        List<User> users = userService.getAllUsers();

        System.out.println("Retrieved Users: " + users);

        return users;
    }

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User body) {
        User user = userService.createUser(body);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User already exists");
        }
        return ResponseEntity.ok(user);
    }

    @PostMapping("/role")
    public ResponseEntity<?> getUserByRole(@RequestParam String role) {
        if (role == null || role.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role is required");
        }
        Optional<Role> r = roleRepository.findByName(role);
        if (!r.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role not found");
        }
        
        return ResponseEntity.ok(userService.getUserByRole(r.get()));
    }
    
    @PostMapping("/me")
    public ResponseEntity<?> whoAmI(@RequestParam Long id) {
        Optional<User> user = userService.getUserById(id);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User not found");
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public void deleteUser(@PathVariable Long id) { 
        userService.deleteUser(id);
    }
}
