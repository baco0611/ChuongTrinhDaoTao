package com.laptrinhjavaweb.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dataEnum.Role;
import com.laptrinhjavaweb.entity.DepartmentEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.DepartmentRepository;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.request.AuthenticationRequest;
import com.laptrinhjavaweb.request.RegisterRequest;
import com.laptrinhjavaweb.response.AuthenticationResponse;
import com.laptrinhjavaweb.response.ErrorLoginResponse;

import jakarta.servlet.http.HttpServletResponse;

@Service
public class AuthenticationService {

	@Autowired
	private LecturersRepository repository;
	@Autowired
	private DepartmentRepository departmentRepository;
	@Autowired
	private PasswordEncoder passwordEncoder;
	@Autowired
	private JwtService jwtService;
	@Autowired
	private AuthenticationManager authenticationManager;
	@Autowired
	private DepartmentService departmentService;

	public AuthenticationResponse register(RegisterRequest request) {
		// Tạo danh sách roles từ request
		List<Role> roles = request.getRoles() != null ? request.getRoles() : Collections.singletonList(Role.USER);
		DepartmentEntity department = departmentService.getDepartmentFromSomewhere(request.getDepartmentId());
		var lecturers = LecturersEntity.builder().firstName(request.getFirstname()).lastName(request.getLastname())
				.email(request.getEmail()).lecturersCode(request.getLecturersCode())
				.department(department)
				.password(passwordEncoder.encode(request.getPassword())).roles(roles) // Cập nhật roles từ request
				.departmentManager(false)
				.deleted(false)
				.build();

		repository.save(lecturers);

		var jwtToken = jwtService.generateToken(lecturers);

		return AuthenticationResponse.builder().data(LecturersConverter.convertToResponse(lecturers)).token(jwtToken)
				.status(200).build();
	}

	public AuthenticationResponse authenticate(AuthenticationRequest request, HttpServletResponse response) {
		try {
			var user = repository.findByLecturersCode(request.getLecturersCode())
					.orElseThrow(() -> new UsernameNotFoundException("Người dùng không tồn tại"));

			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(request.getLecturersCode(), request.getPassword()));

			var jwtToken = jwtService.generateToken(user);

			return AuthenticationResponse.builder().data(LecturersConverter.convertToResponse(user)).token(jwtToken)
					.status(200).build();
		} catch (UsernameNotFoundException e) {
			// Xử lý lỗi khi mã giảng viên không hợp lệ
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return AuthenticationResponse.builder()
					.data(ErrorLoginResponse.builder().lecturersCodeError("Người dùng không tồn tại").build())
					.status(401).build();
		} catch (BadCredentialsException e) {
			// Xử lý lỗi khi mật khẩu không hợp lệ
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return AuthenticationResponse.builder().data(
					ErrorLoginResponse.builder().passwordError("Mật khẩu không đúng").lecturersCodeError(null).build())
					.status(401).build();
		} catch (AuthenticationException e) {
			// Xử lý lỗi khi mật khẩu và mã giảng viên không hợp lệ
			response.setStatus(HttpStatus.UNAUTHORIZED.value());
			return AuthenticationResponse.builder().data(ErrorLoginResponse.builder()
					.lecturersCodeError("Người dùng không tồn tại").passwordError("Mật khẩu không đúng").build())
					.status(401).build();
		}
	}

}
