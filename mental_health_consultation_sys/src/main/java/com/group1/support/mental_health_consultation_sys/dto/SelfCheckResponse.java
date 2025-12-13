package com.group1.support.mental_health_consultation_sys.dto;

import java.util.List;

public record SelfCheckResponse(
    Long id,
    int score,
    List<Long> recommendedResourceIds
) {}