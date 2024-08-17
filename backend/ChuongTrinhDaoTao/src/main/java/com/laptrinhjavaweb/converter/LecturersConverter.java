package com.laptrinhjavaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.request.LecturersResponse;

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

		// Convert List<Role> to List<String> for roles
		List<String> roles = entity.getRoles().stream().map(role -> role.name()).collect(Collectors.toList());
		response.setRole(roles);

		// Convert List<Department> to List<String> for department names
		List<String> departmentNames = entity.getDepartments().stream().map(department -> department.getDepartmentName())
				.collect(Collectors.toList());
		response.setDepartmentName(departmentNames);

		return response;
	}

}
