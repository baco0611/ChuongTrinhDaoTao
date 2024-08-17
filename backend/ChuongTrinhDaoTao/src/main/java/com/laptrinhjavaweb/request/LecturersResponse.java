package com.laptrinhjavaweb.request;

import java.util.List;

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
	
	private List<String> departmentName;
	
	private String email;
	
	private String lecturersCode;
	
	private List<String> role; 
}
