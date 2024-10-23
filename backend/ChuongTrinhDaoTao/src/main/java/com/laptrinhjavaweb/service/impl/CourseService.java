package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.dto.CourseDTO;
import com.laptrinhjavaweb.entity.CourseEntity;
import com.laptrinhjavaweb.entity.CourseOutlineEntity;
import com.laptrinhjavaweb.repository.CourseRepository;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public List<CourseDTO> searchCourses(String courseCode, String courseName) {
        List<CourseEntity> courses = courseRepository.searchCourses(courseCode, courseName);
        return courses.stream().flatMap(course -> convertToDTOs(course).stream()).collect(Collectors.toList());
    }

    private List<CourseDTO> convertToDTOs(CourseEntity entity) {
        List<CourseDTO> courseDTOs = new ArrayList<>();
        if (entity.getCourseOutlines() != null && !entity.getCourseOutlines().isEmpty()) {
            for (CourseOutlineEntity outline : entity.getCourseOutlines()) {
                CourseDTO dto = new CourseDTO();
                dto.setCourseName(entity.getCourseName());
                dto.setCourseCode(entity.getCourseCode());
                dto.setCourseOutlineId(outline.getIdCourseOutline());
                courseDTOs.add(dto);
            }
        }
        return courseDTOs;
    }}
