package com.laptrinhjavaweb.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentDetailDTO {
	private Long departmentId;
	private String departmentName;
	private LecturerOfDepartmentDTO responsibleLecturer;
	private List<LecturerOfDepartmentDTO> lecturerList;
}
