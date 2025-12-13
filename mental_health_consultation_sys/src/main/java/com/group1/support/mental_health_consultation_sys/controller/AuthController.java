package com.group1.support.mental_health_consultation_sys.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.AuthService;
import com.group1.support.mental_health_consultation_sys.service.OTPService;
import com.group1.support.mental_health_consultation_sys.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthService authService;

    @Autowired
    private OTPService otpService;

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User body) {
        String token = userService.registerNewUser(body);
        if (token != null) {
            return ResponseEntity.ok("{\"token\": \"" + token + "\"}");
        } else {
            return ResponseEntity.status(400).body("{\"error\": \"User registration failed\"}");
        }
    }

    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtP(@RequestParam String phoneNumber, @RequestParam String inputedOTP) {
        if(otpService.validateOTP(phoneNumber, Integer.parseInt(inputedOTP)))
            return ResponseEntity.ok("{\"message\": \"OTP verified successfully\"}");
        return ResponseEntity.status(400).body("{\"error\": \"Invalid OTP\"}");
    }

    @PostMapping("/send-otp")
    public ResponseEntity<?> sentOTP(@RequestParam String phoneNumber) {
        try {
            Integer code = otpService.sendOtpViaSMS(phoneNumber);
            System.out.println("OTP sent to " + phoneNumber + ": " + code);
            return ResponseEntity.ok("{\"sentTo\": \""+phoneNumber+"\", \"code\": \"" + code + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("{\"error\": \"Failed to send OTP\"}");
        }
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestParam String email, @RequestParam String password) {
        try {
            String token = authService.authenticate(email, password);
            // System.out.println("Token: " + token);
            return ResponseEntity.ok("{\"token\": \"" + token + "\"}");
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body("{\"[ERROR SIGNIN]\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String email, @RequestParam String newPassword) {
        boolean success = userService.resetPassword(email, newPassword);
        if (success) {
            return ResponseEntity.ok().body("{\"message\": \"Password reset successful\"}");
        } else {
            return ResponseEntity.status(404).body("{\"error\": \"User not found\"}");
        }
    }
}
