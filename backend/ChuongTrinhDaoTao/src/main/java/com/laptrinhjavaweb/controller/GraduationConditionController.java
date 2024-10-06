package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.entity.GraduationConditionEntity;
import com.laptrinhjavaweb.service.impl.GraduationConditionService;

@RestController
@RequestMapping("/api/graduation-conditions")
public class GraduationConditionController {

	@Autowired
	private GraduationConditionService graduationConditionService;

	@GetMapping(value = "/getAll")
	public ResponseEntity<Map<String, Object>> getGraduationConditions() {
		List<GraduationConditionEntity> conditions = graduationConditionService.getAllGraduationConditions();
		Map<String, Object> response = new HashMap<>();
		response.put("data", conditions);
		response.put("status", 200);

		return ResponseEntity.ok(response);
	}

	@PostMapping("/update")
	public ResponseEntity<Map<String, Object>> updateGraduationCondition(@RequestBody Map<String, Object> request) {
		Long id = Long.valueOf(request.get("id").toString());
		String newContent = request.get("condition").toString();

		String errorMessage = graduationConditionService.updateGraduationCondition(id, newContent);

		Map<String, Object> response = new HashMap<>();
		response.put("message", errorMessage != null ? errorMessage : null);
		response.put("status", 200);

		return ResponseEntity.ok(response);
	}

	@PostMapping(value = "/create")
	public ResponseEntity<Map<String, Object>> createGraduationConditions() {
		List<GraduationConditionEntity> conditions = graduationConditionService.createGraduationConditions();
		Map<String, Object> response = new HashMap<>();
		response.put("data", conditions);
		response.put("status", 200);

		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete/{id}")
    public ResponseEntity<Map<String, Object>> deleteCondition(@PathVariable("id") Long id) {
        Map<String, Object> response = graduationConditionService.deleteConditionAndReturnList(id);
        return ResponseEntity.ok(response);
    }

}