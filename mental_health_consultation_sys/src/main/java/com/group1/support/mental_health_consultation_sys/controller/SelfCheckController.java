package com.group1.support.mental_health_consultation_sys.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import com.group1.support.mental_health_consultation_sys.dto.SelfCheckRequest;
import com.group1.support.mental_health_consultation_sys.dto.SelfCheckResponse;
import com.group1.support.mental_health_consultation_sys.model.SelfCheckResult;
import com.group1.support.mental_health_consultation_sys.service.SelfCheckResultService;

import java.util.List;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/api/self-check")
public class SelfCheckController {

    @Autowired
    private SelfCheckResultService selfCheckResultService;

    @PostMapping(
        consumes = MediaType.APPLICATION_JSON_VALUE,
        produces = MediaType.APPLICATION_JSON_VALUE
    )
    public SelfCheckResponse saveResult(@RequestBody SelfCheckRequest req, @RequestParam  Long userId) {
        return selfCheckResultService.saveResult(req, userId);
    }

    @GetMapping("/user/{userId}")
    public List<SelfCheckResult> getResultsByUserId(@PathVariable Long userId) {
        return selfCheckResultService.getResultsByUserId(userId);
    }
}
