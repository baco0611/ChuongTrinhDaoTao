package com.laptrinhjavaweb.dto;

import java.util.List;
import lombok.Data;

@Data
public class CreateDetailedProgramDTO {
	private Long programId;
    private Long courseOutlineId;
    private Integer index;
    private Boolean mandatory;
    private List<String> prerequisiteCourse;
    private List<String> priorCourse;
    private List<String> concurrentCourse;
    private String knowledgeModule;
    private String detailedKnowledgeModule;
    private Long specializationId;
    private Boolean replacesThesis;
    private Integer semester;
}
