package com.laptrinhjavaweb.request;

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
}
