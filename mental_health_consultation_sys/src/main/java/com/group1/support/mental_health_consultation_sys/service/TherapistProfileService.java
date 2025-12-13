package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.model.TherapistProfile;
import com.group1.support.mental_health_consultation_sys.repository.TherapistProfileRepository;

import java.util.List;
import java.util.Optional;

@Service
public class TherapistProfileService {
    @Autowired
    private TherapistProfileRepository repository;

    public List<TherapistProfile> findAll() {
        return repository.findAll();
    }

    public TherapistProfile findByUserId(Long userId) {
        return repository.findByUserId(userId);
    }

    public Optional<TherapistProfile> findById(Long id) {
        return repository.findById(id);
    }

    public TherapistProfile save(TherapistProfile profile) {
        return repository.save(profile);
    }

    public void deleteById(Long id) {
        repository.deleteById(id);
    }
}
