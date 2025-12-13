package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.model.Role;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.RoleRepository;
import com.group1.support.mental_health_consultation_sys.repository.UserRepository;
import com.group1.support.mental_health_consultation_sys.util.JwtUtil;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepo;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User createUser(User user) {
        // Check if the user already exists
        List<Role> roles = roleRepo.findAllById(user.getRoleIds());
        if (roles.size() != user.getRoleIds().size()) {
            throw new IllegalArgumentException("One or more roles not found");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setRoles(new HashSet<>(roles));

        // Check if the user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        // Save the new user
        User savedUser = userRepository.save(user);
        // Return the token
        return userRepository.save(savedUser);
    }

    // Register a new user and return a token
    public String registerNewUser(User user) {

        List<Role> roles = roleRepo.findAllById(user.getRoleIds());
        if (roles.size() != user.getRoleIds().size()) {
            throw new IllegalArgumentException("One or more roles not found");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setEnabled(false);
        user.setRoles(new HashSet<>(roles));

        // Check if the user already exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        // Save the new user
        User savedUser = userRepository.save(user);
        // Return the token
        return jwtUtil.generateToken(savedUser);
    }

    // Fetch a user by ID
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Fetch all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Update user details
    public User updateUser(User updatedUser) {

        // Fetch the existing user
        Optional<User> existingUserOpt = userRepository.findById(updatedUser.getId());
        if (!existingUserOpt.isPresent()) {
            throw new RuntimeException("User not found");
        }
        User existingUser = existingUserOpt.get();
        // Update the user details 
        existingUser.setFirstName(updatedUser.getFirstName());
        existingUser.setLastName(updatedUser.getLastName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
        existingUser.setEnabled(updatedUser.isEnabled());
        existingUser.setRoles(updatedUser.getRoles());
        existingUser.setRoleIds(updatedUser.getRoleIds());
        existingUser.setSavedResources(updatedUser.getSavedResources());
        existingUser.setTherapistProfile(updatedUser.getTherapistProfile());
        existingUser.setSelfCheckResult(updatedUser.getSelfCheckResult());
        existingUser.setAppointments(updatedUser.getAppointments());

        return userRepository.save(updatedUser);
    }

    // Delete a user
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    // Authenticate user
    public boolean authenticate(String email, String password) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            return passwordEncoder.matches(password, user.getPassword());
        }
        return false;
    }

    // Reset user password
    public boolean resetPassword(String email, String newPassword) {
        Optional<User> userOpt = userRepository.findByEmail(email);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(passwordEncoder.encode(newPassword));
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public Object getUserByRole(Role role) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getUserByRole'");
    }
}
