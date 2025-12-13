package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.model.Role;
import com.group1.support.mental_health_consultation_sys.repository.RoleRepository;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    // Fetch all roles
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

    // Fetch a role by ID
    public Optional<Role> getRoleById(Long id) {
        return roleRepository.findById(id);
    }

    // Fetch a role by name
    public Optional<Role> getRoleByName(String name) {
        return roleRepository.findByName(name);
    }

    // Create or update a role
    public Role saveRole(Role role) {
        return roleRepository.save(role);
    }

    // Delete a role by ID
    public void deleteRole(Long id) {
        roleRepository.deleteById(id);
    }
}
