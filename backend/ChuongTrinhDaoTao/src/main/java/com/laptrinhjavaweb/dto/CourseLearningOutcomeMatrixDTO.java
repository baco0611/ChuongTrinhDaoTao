package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class CourseLearningOutcomeMatrixDTO {
	private Long id;
    private Long ploId;
    //Rename detailedProgramId => courseId 
    private Long courseId;
    private Integer competency;
}
