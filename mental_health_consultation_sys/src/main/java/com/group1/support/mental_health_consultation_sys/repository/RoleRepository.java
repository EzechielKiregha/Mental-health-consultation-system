package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.group1.support.mental_health_consultation_sys.model.Role;

import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(String name);
    List<Role> findByIdIn(Collection<Long> ids);
}
