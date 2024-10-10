package com.laptrinhjavaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.response.LecturersResponse;

@Component
public class LecturersConverter {

	public static LecturersResponse convertToResponse(LecturersEntity entity) {
		if (entity == null) {
			return null;
		}

		LecturersResponse response = new LecturersResponse();
		response.setFirstName(entity.getFirstName());
		response.setLastName(entity.getLastName());
		response.setEmail(entity.getEmail());
		response.setLecturersCode(entity.getLecturersCode());
		List<String> roles = entity.getRoles().stream().map(role -> role.name()).collect(Collectors.toList());
		response.setRole(roles);
		response.setDepartmentName(entity.getDepartment().getDepartmentName());

		return response;
	}

	public static LecturersDTO convertToDTO(LecturersEntity entity) {
		if (entity == null) {
			return null;
		}

		LecturersDTO dto = new LecturersDTO();
		dto.setFirstName(entity.getFirstName());
		dto.setLastName(entity.getLastName());
		dto.setLecturerCode(entity.getLecturersCode());
		dto.setLecturerId(entity.getLecturersId().toString()); // Assuming LecturersId is of type Long
		List<String> roles = entity.getRoles().stream().map(role -> role.name()).collect(Collectors.toList());
		dto.setRole(roles);
		dto.setDepartmentName(entity.getDepartment() != null ? entity.getDepartment().getDepartmentName() : null);
		dto.setDepartment(entity.getDepartment() != null ? entity.getDepartment().getDepartmentCode() : null);
		dto.setEmail(entity.getEmail() != null ? entity.getEmail() : null);

		return dto;
	}

}
