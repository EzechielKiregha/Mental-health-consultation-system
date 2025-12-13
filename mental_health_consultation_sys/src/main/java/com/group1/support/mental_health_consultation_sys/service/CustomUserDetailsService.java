package com.group1.support.mental_health_consultation_sys.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.model.Role;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepo;

    public CustomUserDetailsService(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = 
            userRepo.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("No user " + email));
        
        List<GrantedAuthority> authorities = user.getRoles().stream()
            .map(Role::getName) // Map Role entity to its name
            .map(SimpleGrantedAuthority::new)
            .collect(Collectors.toList());

        return new org.springframework.security.core.userdetails.User(
            user.getEmail(),
            user.getPassword(),
            authorities
        );
    }

    public User getDomainUserByEmail(String email) {
        return userRepo.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("No user " + email));
    }
}
