package com.group1.support.mental_health_consultation_sys.dto;

import java.time.Instant;
import java.util.List;

public record SelfCheckRequest( 
  Long usedId,
  Integer score,
  List<Integer> answers,
  Instant takenAt
) {
}