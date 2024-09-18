package com.laptrinhjavaweb.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LecturerOfDepartmentDTO {
	private Long id;
	private String lecturerCode;
	private String lecturerName;
}
