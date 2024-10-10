package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
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
import com.laptrinhjavaweb.entity.DepartmentEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.DepartmentRepository;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.request.ChangePasswordRequest;
import com.laptrinhjavaweb.request.LecturerRequestDTO;
import com.laptrinhjavaweb.request.LecturerSearchRequestDTO;
import com.laptrinhjavaweb.request.UpdateLecturerRequest;
import com.laptrinhjavaweb.response.LecturerResponseDTO;
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

	@Autowired
	private DepartmentService departmentService;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Override
	public Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) {
		Page<LecturersEntity> entitiesPage = lecturersRepository.findByDepartmentAndKeyWord(department, keyWord,
				pageable);
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

	    if (roles == null || roles.isEmpty()) {
	        roles = new ArrayList<>();
	        roles.add("USER");
	        System.out.println("AA");
	    }

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
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));
		if (!isAdmin) {
			response.put("message", "Bạn không có quyền cập nhật thông tin");
			response.put("status", 403);
			return response;
		}
		LecturersEntity lecturersEntity = lecturersRepository.findById(updateRequest.getLecturersId()).orElse(null);
		if (lecturersEntity == null) {
			response.put("message", "Lecturer not found");
			response.put("status", 404);
			return response;
		}
		if(!updateRequest.getLecturerCode().equals("")) {
			lecturersEntity.setLecturersCode(updateRequest.getLecturerCode());
		}
		if (!updateRequest.getFirstName().equals("")) {
			lecturersEntity.setFirstName(updateRequest.getFirstName());
		}
		if (!updateRequest.getLastName().equals("")) {
			lecturersEntity.setLastName(updateRequest.getLastName());
		}
		if (!updateRequest.getEmail().equals("")) {
			lecturersEntity.setEmail(updateRequest.getEmail());
		}
		updateLecturerRoles(lecturersEntity.getLecturersId(), updateRequest.getRoles());
		lecturersRepository.save(lecturersEntity);
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

	@Override
	public Boolean checLecturerCode(String lecturerCode) {
		LecturersEntity lecturersEntity = lecturersRepository.findByLecturersCode(lecturerCode).orElse(null);
		if (lecturersEntity == null) {
			return false;
		}
		return true;
	}

	@Override
	public Map<String, Object> deleteLecturer(String token, String lecturerCode) {
		Map<String, Object> response = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));
		LecturersEntity lecturersEntity = lecturersRepository.findByLecturersCode(lecturerCode).orElse(null);
		if (!isAdmin) {
			response.put("message", "Bạn không có quyền delete thông tin");
			response.put("status", 403);
			return response;
		}
		if (lecturersEntity == null) {
			response.put("message", "Giảng viên không tồn tại");
			response.put("status", 404);
			return response;
		}
		lecturersEntity.setDeleted(true);
		lecturersRepository.save(lecturersEntity);
		response.put("message", null);
		response.put("status", 200);
		return response;
	}

	public Map<String, Object> createLecturer(LecturerRequestDTO request) {
		Map<String, Object> response = new HashMap<>();
		Map<String, Object> data = new HashMap<>();
		String passWord = "@KhoaHoc123";

		if (lecturersRepository.existsByLecturersCode(request.getLecturerCode())) {
			data.put("lectureCode", Map.of("message", "Mã giảng viên trùng lặp"));
		} else {
			data.put("lectureCode", null);
		}

		if (lecturersRepository.existsByEmail(request.getEmail())) {
			data.put("email", Map.of("message", "Email đã được sử dụng"));
		} else {
			data.put("email", null);
		}

		DepartmentEntity department = departmentRepository.findByDepartmentCode(request.getDepartmentCode())
				.orElse(null);
		if (department == null) {
			data.put("department", Map.of("message", "Đơn vị không tồn tại"));
		} else {
			data.put("department", null);
		}

		if (request.getFirstName() == null || request.getFirstName().isEmpty()) {
			data.put("firstName", Map.of("message", "Vui lòng điền tên"));
		} else {
			data.put("firstName", null);
		}

		if (request.getLastName() == null || request.getLastName().isEmpty()) {
			data.put("lastName", Map.of("message", "Vui lòng điền họ đệm"));
		} else {
			data.put("lastName", null);
		}

		if (data.values().stream().allMatch(Objects::isNull)) {
			LecturersEntity lecturer = LecturersEntity.builder().lecturersCode(request.getLecturerCode())
					.firstName(request.getFirstName()).lastName(request.getLastName()).email(request.getEmail())
					.department(department).deleted(false).departmentManager(false)
					.password(passwordEncoder.encode(passWord))
					.roles(request.getRoles().stream().map(role -> Role.valueOf(role)).collect(Collectors.toList()))
					.build();
			lecturersRepository.save(lecturer);

			response.put("status", 200);
			response.put("data", data);
		} else {
			response.put("status", 400);
			response.put("data", data);
		}

		return response;
	}

	public List<LecturerResponseDTO> searchLecturers(LecturerSearchRequestDTO request) {
		List<LecturersEntity> lecturers;

		if (request.getDepartment() != null && !request.getDepartment().isEmpty()) {
			lecturers = lecturersRepository.findByDepartment_DepartmentCode(request.getDepartment());
		} else {
			lecturers = lecturersRepository.findByKeyWord(request.getKeyWord());
		}
		System.out.println("Số giảng viên tìm được: " + lecturers.size());

		// Sắp xếp giảng viên theo đơn vị nếu có mã đơn vị
		return lecturers.stream().filter(
				l -> l.getFirstName().contains(request.getKeyWord()) || l.getLastName().contains(request.getKeyWord()))
				.map(l -> new LecturerResponseDTO(l.getLecturersCode(), l.getLastName() + " " + l.getFirstName(),
						l.getDepartment() != null ? l.getDepartment().getDepartmentName() : ""))
				.collect(Collectors.toList());
	}

}
