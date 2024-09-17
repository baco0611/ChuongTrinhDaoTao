package com.laptrinhjavaweb.response;

import com.laptrinhjavaweb.entity.DepartmentEntity;

import lombok.Data;

@Data
public class TrainingProgramResponse {
    private Long programId;

    private String vietnameseName;

    private String englishName;

    private String educationLevel;

    private String fieldCode;

    private String fieldName;

    private DepartmentEntity department;

    private String admissionTarget;

    private int duration;

    private String trainingMode;

    private int requiredCredits;

    private String graduationRequirements;

    private String diploma;

    private String employmentPositionAfterGraduation;

    private String advancedSkillsDevelopment;

    private String referenceProgram;

    private String overallObjectives;

    private String responsiblePerson;

    private Integer status;
}
