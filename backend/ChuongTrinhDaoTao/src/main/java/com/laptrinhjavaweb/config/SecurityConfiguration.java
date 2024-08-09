package com.laptrinhjavaweb.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfiguration {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final AuthenticationProvider authenticationProvider;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/auth/**").permitAll()// Tất cả các url có đường dẫn như vậy thì không cần xác
                                                                // thực
                        .anyRequest().authenticated())
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    // @Bean
    // public SecurityFilterChain securityFilterChain(HttpSecurity http) throws
    // Exception {
    // http
    // .csrf(csrf -> csrf.disable())
    // .authorizeHttpRequests(auth -> auth
    // .requestMatchers("/auth/public/**").permitAll()
    // .requestMatchers("/auth/assign-responsibility/**").hasAuthority("assign_responsibility")
    // .requestMatchers("/auth/manage-dictionary/**").hasAuthority("manage_dictionary")
    // .requestMatchers("/auth/field/**").hasAuthority("update_field")
    // .requestMatchers("/auth/program/approve/**").hasAuthority("approve_program")
    // .requestMatchers("/auth/program/delete/**").hasAuthority("delete_program")
    // .requestMatchers("/auth/course/**").hasAuthority("update_course")
    // .requestMatchers("/auth/course-plan/approve/**").hasAuthority("approve_course_plan")
    // .requestMatchers("/auth/course-plan/delete/**").hasAuthority("delete_course_plan")
    // .anyRequest().authenticated()
    // )
    // .sessionManagement(session -> session
    // .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    // )
    // .authenticationProvider(authenticationProvider)
    // .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
    //
    // return http.build();
    // }

}
