package com.group1.support.mental_health_consultation_sys.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SelfCheckResultDto {
  private Long id;
  private int score;
  private List<Long> recommendedResourceIds;
  // getters/setters
}

