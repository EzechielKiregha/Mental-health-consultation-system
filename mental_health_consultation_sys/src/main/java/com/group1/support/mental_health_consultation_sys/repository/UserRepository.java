package com.group1.support.mental_health_consultation_sys.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.group1.support.mental_health_consultation_sys.model.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    long countByRoles_Name(String roleName);
    List<User> findAllByRoles_Name(String roleName);

}
