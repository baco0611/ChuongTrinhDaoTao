package com.laptrinhjavaweb.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.entity.GraduationConditionEntity;
import com.laptrinhjavaweb.repository.GraduationConditionRepository;

@Service
public class GraduationConditionService {

	@Autowired
	private GraduationConditionRepository graduationConditionRepository;

	public List<GraduationConditionEntity> getAllGraduationConditions() {
		return graduationConditionRepository.findAll();
	}

	public String updateGraduationCondition(Long id, String newCondition) {
		Optional<GraduationConditionEntity> existingCondition = graduationConditionRepository.findById(id);

		if (existingCondition.isPresent()) {
			GraduationConditionEntity condition = existingCondition.get();
			condition.setCondition(newCondition);
			graduationConditionRepository.save(condition);
			return null;
		} else {
			return "Không tìm thấy điều kiện";
		}
	}

	public Map<String, Object> deleteConditionAndReturnList(Long id) {
		Map<String, Object> response = new HashMap<>();
		GraduationConditionEntity gradCond = graduationConditionRepository.findById(id).orElse(null);
		if (gradCond == null) {
			response.put("message", "Condition not found");
			response.put("status", 404);
			return response;
		}
		graduationConditionRepository.delete(gradCond);
		List<GraduationConditionEntity> remainingConditions = graduationConditionRepository.findAll();
		response.put("data", remainingConditions);
		response.put("message", null);
		response.put("status", 200);

		return response;
	}
}