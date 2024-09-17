package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class SimplifiedTrainingProgramDTO {
	private Long programId;
	private String vietnameseName;
	private String englishName;
	private String educationLevel;
	private String fieldCode;
	private String fieldName;
	private String admissionTarget;
	private String duration;
	private String trainingMode;
	private String requiredCredits;
	private String graduationConditional;
	private String diploma;
	private String employmentPositionAfterGraduation;
	private String advancedSkillsDevelopment;
	private String referenceProgram;
	private String managingDepartment;
}
