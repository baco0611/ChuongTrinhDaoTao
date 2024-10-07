package com.laptrinhjavaweb.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChangePasswordRequest {
	private String oldPassword;
	private String newPassword;
	private String confirmPassword;
	private String lecturerCode;
}