package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.CreateDetailedProgramDTO;
import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.dto.UpdateDetailedProgramDTO;
import com.laptrinhjavaweb.request.UpdateIndexRequest;
import com.laptrinhjavaweb.service.impl.DetailedProgramService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/programs")
public class DetailedProgramController {

	@Autowired
	private DetailedProgramService detailedProgramService;

	@GetMapping("/{programId}/details")
	public ResponseEntity<?> getDetailedPrograms(@PathVariable Long programId) {
		List<DetailedProgramDTO> programs = detailedProgramService.getProgramsByProgramId(programId);

		Map<String, Object> response = new HashMap<>();
		response.put("data", programs);
		response.put("status", 200);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/create")
	public ResponseEntity<?> createDetailedProgram(@RequestBody CreateDetailedProgramDTO dto) {
		try {
			List<DetailedProgramDTO> createdProgram = detailedProgramService.createDetailedProgram(dto);
			Map<String, Object> response = new HashMap<>();
			response.put("data", createdProgram);
			response.put("status", 200);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
	}

	@DeleteMapping("/delete/{id}")
	public ResponseEntity<?> deleteDetailedProgram(@PathVariable("id") Long id) {
		try {
			List<DetailedProgramDTO> programs = detailedProgramService.deleteDetailedProgram(id);
			Map<String, Object> response = new HashMap<>();
			response.put("data", programs);
			response.put("status", 200);
			return ResponseEntity.ok(response);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("DetailedProgram with ID " + id + " not found");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while deleting");
		}
	}

	@PostMapping("/update/{id}")
	public ResponseEntity<?> updateDetailedProgram(@PathVariable("id") Long id,
			@RequestBody UpdateDetailedProgramDTO request) {
		try {
			List<DetailedProgramDTO> updatedProgram = detailedProgramService.updateDetailedProgram(id, request);
			Map<String, Object> response = new HashMap<>();
			response.put("data", updatedProgram);
			response.put("status", 200);
			return ResponseEntity.ok(response);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("DetailedProgram with ID " + id + " not found");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating");
		}
	}

	@PostMapping("/updateIndices")
	public ResponseEntity<?> updateDetailedProgramIndices(@RequestBody UpdateIndexRequest request) {
		try {
			System.out.println(request.getData());
			List<DetailedProgramDTO> updatedPrograms = detailedProgramService
					.updateDetailedProgramIndices(request.getData());
			return ResponseEntity.ok(updatedPrograms);
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("One or more DetailedPrograms not found");
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating");
		}
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> getDetailedProgram(@PathVariable Long id) {
		try {
			CreateDetailedProgramDTO dto = detailedProgramService.getDetailedProgramById(id);
			Map<String, Object> response = new HashMap<>();
			response.put("data", dto);
			response.put("status", 200);
			return ResponseEntity.ok(response);
		} catch (EntityNotFoundException e) {
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body("Detailed Program not found");
		}
		return null;
	}
}