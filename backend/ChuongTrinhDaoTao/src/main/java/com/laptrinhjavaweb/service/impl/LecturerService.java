package com.laptrinhjavaweb.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dataEnum.Role;
import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.request.ChangePasswordRequest;
import com.laptrinhjavaweb.request.UpdateLecturerRequest;
import com.laptrinhjavaweb.service.ILecturerService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LecturerService implements ILecturerService {
	@Autowired
	private LecturersRepository lecturersRepository;

	@Autowired
	private LecturersConverter lecturersConverter; // Ensure this converter is updated to match new DTO

	@Autowired
	private JwtService jwtService;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) {
		System.out.println(department);
		Page<LecturersEntity> entitiesPage = lecturersRepository.findByDepartmentAndKeyWord(department, keyWord,
				pageable);
		for (LecturersEntity lecturersEntity : entitiesPage) {
			System.out.println(lecturersEntity.getFirstName());
		}
		return entitiesPage.map(entity -> lecturersConverter.convertToDTO(entity));
	}

	private boolean isUserAdmin() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		if (authentication != null && authentication.getAuthorities() != null) {
			return authentication.getAuthorities().stream()
					.anyMatch(authority -> authority.getAuthority().equals(Role.ADMIN.name()));
		}
		return false;
	}

	@Override
	public void updateLecturerRoles(Long lecturerId, List<String> roles) {
		if (!isUserAdmin()) {
			throw new SecurityException("Unauthorized: Only admins can update roles");
		}

		LecturersEntity lecturer = lecturersRepository.findById(lecturerId)
				.orElseThrow(() -> new RuntimeException("Lecturer not found"));

		List<Role> roleList = roles.stream().map(Role::valueOf).collect(Collectors.toList());

		lecturer.setRoles(roleList);
		lecturersRepository.save(lecturer);
	}

	@Override
	public LecturersDTO getLecturerDetails(Long lecturerId) {
		LecturersEntity lecturer = lecturersRepository.findById(lecturerId)
				.orElseThrow(() -> new EntityNotFoundException("Giảng viên không tồn tại"));
		return lecturersConverter.convertToDTO(lecturer);
	}

	@Override
	public LecturersEntity findByLecturerCode(String lecturerCode) {
		return lecturersRepository.findByLecturersCode(lecturerCode)
				.orElseThrow(() -> new EntityNotFoundException("Giảng viên không tồn tại"));
	}

	@Override
	public Map<String, Object> updateLecturerInfo(String token, UpdateLecturerRequest updateRequest) {
		Map<String, Object> response = new HashMap<>();
		String tokenLecturerCode = jwtService.extractLecturersCode(token);
		if (!tokenLecturerCode.equals(updateRequest.getLecturerCode())) {
			response.put("message", "Bạn không có quyền update thông tin");
			response.put("status", 403);
			return response;
		}
		LecturersEntity lecturer = findByLecturerCode(tokenLecturerCode);
		if (lecturer == null) {
			response.put("message", "Lecturer not found");
			response.put("status", 404);
			return response;
		}
		if (!updateRequest.getFirstName().equals("")) {
			lecturer.setFirstName(updateRequest.getFirstName());
		}
		if (!updateRequest.getLastName().equals("")) {
			lecturer.setLastName(updateRequest.getLastName());
		}
		if (!updateRequest.getEmail().equals("")) {
			lecturer.setEmail(updateRequest.getEmail());
		}
		lecturersRepository.save(lecturer);
		response.put("message", null);
		response.put("status", 200);
		return response;
	}

	public boolean checkPassword(String rawPassword, String encryptedPassword) {
		return passwordEncoder.matches(rawPassword, encryptedPassword);
	}

	@Override
	public Map<String, Object> changePassword(String token, ChangePasswordRequest changePasswordRequest) {
		Map<String, Object> response = new HashMap<>();
		String tokenLecturerCode = jwtService.extractLecturersCode(token);
		if (!tokenLecturerCode.equals(changePasswordRequest.getLecturerCode())) {
			response.put("message", "Bạn không có quyền thay đổi mật khẩu");
			response.put("status", 403);
			return response;
		}
		LecturersEntity lecturer = findByLecturerCode(tokenLecturerCode);
		if (lecturer == null) {
			response.put("message", "Giảng viên không tồn tại");
			response.put("status", 404);
			return response;
		}
		if (!checkPassword(changePasswordRequest.getOldPassword(), lecturer.getPassword())) {
			response.put("message", "Mật khẩu cũ không đúng");
			response.put("status", 400);
			return response;
		}
		if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
			response.put("message", "Mật khẩu mới và mật khẩu nhập lại không khớp");
			response.put("status", 400);
			return response;
		}
		lecturer.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
		lecturersRepository.save(lecturer);
		response.put("message", null);
		response.put("status", 200);
		return response;
	}

}
