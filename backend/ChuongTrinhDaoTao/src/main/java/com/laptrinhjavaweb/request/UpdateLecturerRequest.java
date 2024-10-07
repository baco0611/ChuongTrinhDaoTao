package com.laptrinhjavaweb.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UpdateLecturerRequest {
	private String firstName;
	private String lastName;
	private String email;
	private String lecturerCode;
	private String department;
	private List<String> roles;
}
