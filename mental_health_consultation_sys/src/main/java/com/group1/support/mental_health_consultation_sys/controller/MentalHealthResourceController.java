package com.group1.support.mental_health_consultation_sys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.model.MentalHealthResource;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.MentalHealthResourceService;
import com.group1.support.mental_health_consultation_sys.service.UserService;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/resources")
public class MentalHealthResourceController {
    @Autowired
    private MentalHealthResourceService resourceService;

    @Autowired
    private UserService userService;


    @PostMapping("/upload")
    public ResponseEntity<?> uploadResource(
            @RequestBody MentalHealthResource resource,
            @RequestParam Long userId,
            @RequestParam Integer questionIndex
    ) {
        Optional<User> user = userService.getUserById(userId);

        if(user.isPresent()) {
            resource.setTherapist(user.get());
            resource.setQuestionIndex(questionIndex);
        } else {
            return ResponseEntity.status(400).body("User not found");
        }
        MentalHealthResource savedResource = resourceService.saveResource(resource);
        if (savedResource == null) {
            return ResponseEntity.status(400).body("Failed to save resource");
        }
        return ResponseEntity.ok(savedResource);
    }


    @GetMapping
    public ResponseEntity<List<MentalHealthResource>> listResources(
            @RequestParam(required = false) List<Long> ids
    ) {
        List<MentalHealthResource> resources = resourceService.getAllResources();
        if (ids != null && !ids.isEmpty()) {
            resources = resources.stream()
                    .filter(resource -> ids.contains(resource.getId()))
                    .toList();
        }
        
        return ResponseEntity.ok(resources);
    }
}
