package com.laptrinhjavaweb.dto;
import java.util.List;

import lombok.Data;

@Data
public class DetailedProgramDTO {
	private Long id; 
    private Integer index; 
    private Long idCourseOutline;
    private Boolean replacesThesis;
    private String courseCode;
    private String courseName;
    private Boolean mandatory;
    private Integer creditNumber;
    private Integer theoryHours;
    private Integer exerciseHours;
    private Integer discussionHours;
    private Integer practicalHours;
    private Integer internshipHours;
    private Integer testHours; 
    private List<String> prerequisiteCourse; 
    private List<String> priorCourse; 
    private List<String> concurrentCourse; 
    private Integer semesterHours; 
    private String knowledgeModule;
    private String detailedKnowledgeModule;
    private Long specializationId;
    private String specializationName;
}
