package com.laptrinhjavaweb.dto;

import java.util.List;

import lombok.Data;

@Data
public class CourseMatrixRequestDTO {
	private List<Long> deleteElement;
	private List<CreateElementDTO> createElement;
	private List<UpdateElementDTO> updateElement;
	private Long programId;

	@Data
	public static class CreateElementDTO {
		private Long ploId;
		private Long courseId;
		private int competency;
	}

	@Data
	public static class UpdateElementDTO {
		private Long id;
		private int competency;
	}
}
