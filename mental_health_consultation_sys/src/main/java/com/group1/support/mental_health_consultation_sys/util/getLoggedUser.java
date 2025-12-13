package com.group1.support.mental_health_consultation_sys.util;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@Component
public class getLoggedUser {

  @Autowired
  private JwtUtil jwtUtil;
  @Autowired
  private UserService userService;
  
  public User CurrentLoggedInUser(HttpServletRequest request) {
    String header = request.getHeader("Authorization");
      if (header == null || !header.startsWith("Bearer ")) {
          return null;
      }
      String token = header.substring(7);
      String email = jwtUtil.extractEmail(token);

      User user = userService.getUserByEmail(email).get();

      return user;
  }
}
