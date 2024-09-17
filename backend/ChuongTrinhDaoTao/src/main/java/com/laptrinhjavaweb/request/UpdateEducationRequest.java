package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class UpdateEducationRequest {
	private String admissionTarget;
    private String advancedSkillsDevelopment;
    private String diploma;
    private Integer duration;
    private String educationLevel;
    private String employmentPositionAfterGraduation;
    private String englishName;
    private String fieldCode;
    private String fieldName;
    private String graduationConditional;
    private String managingDepartment;
    private String referenceProgram;
    private Integer requiredCredits;
    private String trainingMode;
    private String vietnameseName;
    private Long programId;
}
