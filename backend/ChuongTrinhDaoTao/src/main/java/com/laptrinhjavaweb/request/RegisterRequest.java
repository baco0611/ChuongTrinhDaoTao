package com.laptrinhjavaweb.request;

import java.util.List;

import com.laptrinhjavaweb.dataEnum.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
	private String lecturersCode;
	private String firstname;
	private String lastname;
	private String email;
	private String password;
	private Long departmentId;
	private List<Role> roles;
}
