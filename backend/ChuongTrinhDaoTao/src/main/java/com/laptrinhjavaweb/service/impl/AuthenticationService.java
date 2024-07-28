package com.laptrinhjavaweb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dataEnum.Role;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.request.AuthenticationRequest;
import com.laptrinhjavaweb.request.RegisterRequest;
import com.laptrinhjavaweb.response.AuthenticationResponse;

@Service
public class AuthenticationService {

	@Autowired
	private LecturersRepository repository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;

	public AuthenticationResponse register(RegisterRequest request) {
		var lecturers = LecturersEntity.builder().firstName(request.getFirstname()).lastName(request.getLastname())
				.email(request.getEmail()).lecturersCode(request.getLecturersCode())
				.password(passwordEncoder.encode(request.getPassword())).role(Role.USER).build();
		repository.save(lecturers);
		var jwtToken = jwtService.generateToken(lecturers);
		return AuthenticationResponse.builder()
			    .user(
			            AuthenticationResponse.UserResponse.builder()
			                .data(LecturersConverter.convertToResponse(lecturers))
			                .token(jwtToken)
			                .status(200)
			                .build()
			        )
			        .build();

	}

	public AuthenticationResponse authenticate(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getLecturersCode(), request.getPassword()));
		var user = repository.findByLecturersCode(request.getLecturersCode()).orElseThrow();
		var jwtToken = jwtService.generateToken(user);
		return AuthenticationResponse.builder()
			    .user(
			            AuthenticationResponse.UserResponse.builder()
			                .data(LecturersConverter.convertToResponse(user))
			                .token(jwtToken)
			                .status(200)
			                .build()
			        )
			        .build();
	}
}
