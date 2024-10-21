package com.laptrinhjavaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.LearningOutComesObjectiveMatrixDTO;
import com.laptrinhjavaweb.request.UpdateMatrixRequestDTO;
import com.laptrinhjavaweb.response.LearningOutComesObjectiveMatrixResponse;
import com.laptrinhjavaweb.service.impl.LearningOutComesObjectiveMatrixService;

@RestController
@RequestMapping("/api/learning-objectives")
public class LearningOutComesObjectiveMatrixController {

	@Autowired
	private LearningOutComesObjectiveMatrixService service;

	@GetMapping("/getAll")
	public ResponseEntity<LearningOutComesObjectiveMatrixResponse> getAllMatrices() {
		List<LearningOutComesObjectiveMatrixDTO> data = service.getAllMatrices();
		LearningOutComesObjectiveMatrixResponse response = new LearningOutComesObjectiveMatrixResponse(data, 200);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateMatrix(@RequestBody UpdateMatrixRequestDTO request) {
		try {
			List<LearningOutComesObjectiveMatrixDTO> updatedData = service.updateMatrix(request);
			return ResponseEntity.ok().body(updatedData);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(500).body("Error updating matrix");
		}
	}
}