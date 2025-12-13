package com.group1.support.mental_health_consultation_sys.filter;

import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.group1.support.mental_health_consultation_sys.model.User;
import com.group1.support.mental_health_consultation_sys.service.CustomUserDetailsService;
import com.group1.support.mental_health_consultation_sys.util.JwtUtil;

import java.io.IOException;

@Component
public class JwtRequestFilter extends OncePerRequestFilter {

    private final JwtUtil jwt;
    private final CustomUserDetailsService userDetailsService;

    public JwtRequestFilter(JwtUtil jwt, CustomUserDetailsService uds) {
        this.jwt = jwt;
        this.userDetailsService = uds;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            String token = header.substring(7);
            try {
                String email = jwt.extractEmail(token);

                // 1) Load user for authorities
                UserDetails userDetails = userDetailsService.loadUserByUsername(email);
                User user = userDetailsService.getDomainUserByEmail(email);
                // 2) Validate token against user (optional extra check)
                if (jwt.validateToken(token, user)) {

                    // 3) Build Authentication
                    UsernamePasswordAuthenticationToken auth =
                        new UsernamePasswordAuthenticationToken(
                            userDetails,
                            null,
                            userDetails.getAuthorities()
                        );

                    auth.setDetails(
                      new WebAuthenticationDetailsSource().buildDetails(request)
                    );

                    // 4) Tell Spring Security about it
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            } catch (JwtException | UsernameNotFoundException e) {
                // Invalid token or no such user → reject
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"error\":\"Invalid or expired token\"}");
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}

