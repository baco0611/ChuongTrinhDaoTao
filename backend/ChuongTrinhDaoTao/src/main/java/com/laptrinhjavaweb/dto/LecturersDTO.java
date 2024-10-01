package com.laptrinhjavaweb.dto;

import java.util.List;

import lombok.Data;

@Data
public class LecturersDTO {
	private String firstName;
	private String lastName;
	private String lecturerCode;
	private String lecturerId;
	private List<String> role;
	private String departmentName;
	private String email;
}
