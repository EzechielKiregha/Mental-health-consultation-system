package com.group1.support.mental_health_consultation_sys.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.group1.support.mental_health_consultation_sys.dto.SelfCheckRequest;
import com.group1.support.mental_health_consultation_sys.dto.SelfCheckResponse;
import com.group1.support.mental_health_consultation_sys.model.SelfCheckResult;
import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.repository.MentalHealthResourceRepository;
import com.group1.support.mental_health_consultation_sys.repository.SelfCheckResultRepository;
import com.group1.support.mental_health_consultation_sys.repository.UserRepository;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Service
public class SelfCheckResultService {
    @Autowired
    private SelfCheckResultRepository selfCheckResultRepository;

    @Autowired
    private UserRepository userRepo;

    @Autowired
    private MentalHealthResourceRepository resourceRepository;

    public SelfCheckResponse saveResult(SelfCheckRequest req, Long userId) {
        User user = userRepo.findById(userId)
            .orElseThrow(() -> new IllegalArgumentException("User not found"));

        SelfCheckResult entity = new SelfCheckResult();
        entity.setUser(user);
        entity.setScore(req.score());
        try {
            entity.setAnswersJson(new ObjectMapper().writeValueAsString(req.answers()));
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error processing JSON", e);
        }
        entity.setAnswers(req.answers());
        entity.setTakenAt(req.takenAt());

        // 2) Compute recommendations
        List<Integer> answers = entity.getAnswers();
        List<Long> recommendedResourceIds = computeRecommendations(answers);

        // 1) Save the result entity as you do now
        entity.setRecommendedResourceIds(recommendedResourceIds);
        SelfCheckResult saved = selfCheckResultRepository.save(entity);

        SelfCheckResponse out = new SelfCheckResponse(saved.getId(), saved.getScore(), recommendedResourceIds);

        return out;
    }

    private List<Long> computeRecommendations(List<Integer> answers) {
        Set<Long> recs = new LinkedHashSet<>();
        for (int i = 0; i < answers.size(); i++) {
            if (answers.get(i) >= 2) {
                // fetch all resources tagged for question i
                var list = resourceRepository.findByQuestionIndex(i);
                list.forEach(r -> recs.add(r.getId()));
            }
        }
        return new ArrayList<>(recs);
    }
    

    public List<SelfCheckResult> getResultsByUserId(Long userId) {
        return selfCheckResultRepository.findByUserId(userId);
    }


    
}
