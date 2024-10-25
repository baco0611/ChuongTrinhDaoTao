package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.CourseLearningOutcomeMatrixDTO;
import com.laptrinhjavaweb.dto.CourseMatrixRequestDTO;
import com.laptrinhjavaweb.entity.CourseLearningOutcomeMatrixEntity;
import com.laptrinhjavaweb.service.impl.CourseLearningOutcomeMatrixService;

@RestController
@RequestMapping("/api/course-outcome-matrix")
public class CourseLearningOutcomeMatrixController {
	@Autowired
	private CourseLearningOutcomeMatrixService courseLearningOutcomeMatrixService;

	@GetMapping("/getAll/{programId}")
	public ResponseEntity<?> getCourseLearningOutcomeMatrixByProgramId(@PathVariable Long programId) {
		List<CourseLearningOutcomeMatrixDTO> data = courseLearningOutcomeMatrixService
				.getCourseLearningOutcomeMatrixByProgramId(programId);
		Map<String, Object> response = new HashMap<>();
		response.put("data", data);
		response.put("status", 200);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/process")
	public ResponseEntity<?> processCourseMatrix(
			@RequestBody CourseMatrixRequestDTO request) {
		List<CourseLearningOutcomeMatrixDTO> result = courseLearningOutcomeMatrixService.processCourseMatrix(request);
		return ResponseEntity.ok(result); 
	}
}
