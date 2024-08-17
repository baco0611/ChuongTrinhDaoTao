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
		http.csrf(csrf -> csrf.disable())
				.authorizeHttpRequests(auth -> auth.requestMatchers("/auth/public/**").permitAll()// url dành cho login,
																									// register
//              .requestMatchers("/auth/user/**").hasAuthority("USER")
//              .requestMatchers("/auth/assign-responsibility/**").hasAuthority("ASSIGN_RESPONSIBILITY")
//              .requestMatchers("/auth/manage-dictionary/**").hasAuthority("MANAGE_DICTIONARY")
//              .requestMatchers("/auth/field/**").hasAuthority("UPDATE_FIELD")
//              .requestMatchers("/auth/program/approve/**").hasAuthority("APPROVE_PROGRAM")
//              .requestMatchers("/auth/program/delete/**").hasAuthority("DELETE_PROGRAM")
//              .requestMatchers("/auth/course/**").hasAuthority("UPDATE_COURSE")
//              .requestMatchers("/auth/course-plan/approve/**").hasAuthority("APPROVE_COURSE_PLAN")
//              .requestMatchers("/auth/course-plan/delete/**").hasAuthority("DELETE_COURSE_PLAN")
						.anyRequest().authenticated())
				.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
				.authenticationProvider(authenticationProvider)
				.addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

}
