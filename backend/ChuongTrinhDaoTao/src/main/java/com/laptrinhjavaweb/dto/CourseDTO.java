package com.laptrinhjavaweb.dto;

import lombok.Data;

@Data
public class CourseDTO {
    private String courseName;
    private String courseCode;
    private Long courseOutlineId;
}