package com.laptrinhjavaweb.dto;

import java.util.Date;
import lombok.Data;

@Data
public class TrainingProgramDTO {
    
    private Integer sequence;

    private Long programId;

    private String programCode;

    private String version;

    private String vietnameseName;

    private String englishName;

    private String educationLevel;

    private String fieldCode;

    private String fieldName;

    private String programManagementDepartment;

    private String admissionTarget;

    private Integer duration;

    private String trainingMode;

    private Integer requiredCredits;

    private String graduationRequirements;

    private String diploma;

    private String employmentPositionAfterGraduation;

    private String advancedSkillsDevelopment;

    private String referenceProgram;

    private String overallObjectives;

    private String responsiblePerson;

    private Integer currentStep;

    private Integer status;

    private Integer generalModule;

    private Integer basicFieldModule;

    private Integer majorFieldModule;

    private Integer supportModule;

    private Integer internshipModule;

    private Integer thesisModule;

    private Integer specializationModule;

    private Date createdAt;
    
    private Date updatedAt;
}
