package com.laptrinhjavaweb.controller;

import com.laptrinhjavaweb.dto.CourseDTO;
import com.laptrinhjavaweb.request.SearchCourseRequest;
import com.laptrinhjavaweb.service.impl.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @PostMapping("/search")
    public ResponseEntity<List<CourseDTO>> searchCourses(@RequestBody SearchCourseRequest request) {
        List<CourseDTO> result = courseService.searchCourses(request.getCourseCode(), request.getCourseName());
        return ResponseEntity.ok(result);
    }
}
