package com.group1.support.mental_health_consultation_sys.model;

import java.util.Set;

public class UserDTO {
    private Long id;
    private String email;
    private Set<Role> roles;

    public UserDTO(Long id, String email, Set<Role> roles) {
        this.id = id;
        this.email = email;
        this.roles = roles;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public Set<Role> getRoles() {
        return roles;
    }
}
