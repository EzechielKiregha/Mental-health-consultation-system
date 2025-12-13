package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import com.group1.support.mental_health_consultation_sys.model.MentalHealthResource;
import com.group1.support.mental_health_consultation_sys.model.ResourceType;
import com.group1.support.mental_health_consultation_sys.repository.MentalHealthResourceRepository;

import java.util.List;
import java.util.Optional;

@Service
public class MentalHealthResourceService {
    @Autowired
    private MentalHealthResourceRepository repository;

    // Fetch all resources
    public List<MentalHealthResource> getAllResources() {
        return repository.findAll();
    }

    // Fetch a resource by ID
    public Optional<MentalHealthResource> getResourceById(Long id) {
        return repository.findById(id);
    }

    // Save a new resource
    public MentalHealthResource saveResource(MentalHealthResource resource) {
        if (resource.getResourceType().equals(ResourceType.ARTICLE)){
            resource.setResourceType(ResourceType.ARTICLE);
        }
        else if (resource.getResourceType().equals(ResourceType.EXERCISE)){
            resource.setResourceType(ResourceType.EXERCISE);
        }
        else if (resource.getResourceType().equals(ResourceType.GUIDE)){
            resource.setResourceType(ResourceType.GUIDE);
        }
        else {
            throw new IllegalArgumentException("Invalid resource type");
        }
        return repository.save(resource);
    }

    // Update an existing resource
    public MentalHealthResource updateResource(Long id, MentalHealthResource updatedResource) {
        MentalHealthResource resource = repository.findById(id).orElseThrow(() -> new RuntimeException("Resource not found"));
        resource.setTitle(updatedResource.getTitle());
        resource.setContent(updatedResource.getContent());
        resource.setResourceType(updatedResource.getResourceType());
        return repository.save(resource);
    }

    // Delete a resource
    public void deleteResource(Long id) {
        repository.deleteById(id);
    }
}
