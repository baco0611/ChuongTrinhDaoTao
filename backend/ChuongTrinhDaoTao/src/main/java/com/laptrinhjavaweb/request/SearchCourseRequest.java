package com.laptrinhjavaweb.request;

import lombok.Data;

@Data
public class SearchCourseRequest {
    private String courseCode;
    private String courseName;
}
