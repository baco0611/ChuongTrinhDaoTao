package com.laptrinhjavaweb.response;

import java.util.List;

import com.laptrinhjavaweb.entity.DepartmentEntity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LecturersResponse {

	private String firstName;

	private String lastName;

	private String departmentName;

	private String email;

	private String lecturersCode;

	private List<String> role;
}
