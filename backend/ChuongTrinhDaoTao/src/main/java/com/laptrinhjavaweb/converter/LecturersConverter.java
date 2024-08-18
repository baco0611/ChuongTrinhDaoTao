package com.laptrinhjavaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

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

}
