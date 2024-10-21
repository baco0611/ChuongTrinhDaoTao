package com.laptrinhjavaweb.dto;
import java.util.List;

import lombok.Data;

@Data
public class DetailedProgramDTO {
	private Long id; 
    private int index; 
    private Long idCourseOutline;
    private Boolean replacesThesis;
    private String courseCode;
    private String courseName;
    private Boolean mandatory;
    private int creditNumber;
    private int theoryHours;
    private int exerciseHours;
    private int discussionHours;
    private int practicalHours;
    private int internshipHours;
    private int testHours; 
    private List<String> prerequisiteCourse; 
    private List<String> priorCourse; 
    private List<String> concurrentCourse; 
    private int semesterHours; 
    private String knowledgeModule;
    private String detailedKnowledgeModule;
    private Long specializationId;
    private String specializationName;
}
