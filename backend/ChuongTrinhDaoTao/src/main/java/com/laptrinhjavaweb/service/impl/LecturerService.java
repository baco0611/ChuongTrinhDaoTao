package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dataEnum.Role;
import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.service.ILecturerService;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LecturerService implements ILecturerService {
	@Autowired
	private LecturersRepository lecturersRepository;

	@Autowired
	private LecturersConverter lecturersConverter; // Ensure this converter is updated to match new DTO

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
}
