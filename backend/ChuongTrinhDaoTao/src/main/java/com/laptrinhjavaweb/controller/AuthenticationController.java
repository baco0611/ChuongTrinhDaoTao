package com.laptrinhjavaweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.request.AuthenticationRequest;
import com.laptrinhjavaweb.request.RegisterRequest;
import com.laptrinhjavaweb.response.AuthenticationResponse;
import com.laptrinhjavaweb.service.impl.AuthenticationService;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/auth/public")
public class AuthenticationController {
	@Autowired
	private AuthenticationService service;

	// Api để đưa dữ liệu gv vào db
	@PostMapping("/register")
	public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
		return ResponseEntity.ok(service.register(request));
	}

	@PostMapping("/login")
	public ResponseEntity<AuthenticationResponse> authenticate(@RequestBody AuthenticationRequest request,
			HttpServletResponse response) {
		AuthenticationResponse authResponse = service.authenticate(request, response);
		return ResponseEntity.status(authResponse.getStatus()).body(authResponse);
	}
}
