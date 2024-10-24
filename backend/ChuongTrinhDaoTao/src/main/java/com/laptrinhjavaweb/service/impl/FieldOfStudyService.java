package com.laptrinhjavaweb.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.FieldOfStudyConverter;
import com.laptrinhjavaweb.dto.FieldOfStudyDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.FieldOfStudyEntity;
import com.laptrinhjavaweb.repository.FieldOfStudyRepository;
import com.laptrinhjavaweb.request.DeleteFieldOfStudyRequest;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class FieldOfStudyService {

	@Autowired
	private FieldOfStudyRepository fieldOfStudyRepository;

	@Autowired
	private FieldOfStudyConverter fieldOfStudyConverter;

	@Autowired
	private DepartmentService departmentService;

	public List<FieldOfStudyDTO> getAllFieldsOfStudy() {
		List<FieldOfStudyEntity> entities = fieldOfStudyRepository.findAll();
		return entities.stream().map(fieldOfStudyConverter::convertToDTO).collect(Collectors.toList());
	}

	public boolean existsByFieldCode(String fieldCode) {
		return fieldOfStudyRepository.existsByFieldCode(fieldCode);
	}

	public FieldOfStudyEntity createEmptyFieldOfStudy() {
		FieldOfStudyEntity fieldOfStudy = new FieldOfStudyEntity();
		fieldOfStudy.setFieldCode("");
		fieldOfStudy.setFieldName("");
		fieldOfStudy.setDepartment(null);
		return fieldOfStudyRepository.save(fieldOfStudy);
	}

	public void updateFieldOfStudy(FieldOfStudyDTO fieldOfStudyDTO) {
		Optional<FieldOfStudyEntity> optionalFieldOfStudy = fieldOfStudyRepository.findById(fieldOfStudyDTO.getId());
		if (optionalFieldOfStudy.isPresent()) {
			FieldOfStudyEntity fieldOfStudy = optionalFieldOfStudy.get();
			fieldOfStudy.setFieldCode(fieldOfStudyDTO.getFieldCode());
			fieldOfStudy.setFieldName(fieldOfStudyDTO.getFieldName());
			fieldOfStudy.setDepartment(departmentService.findByDepartmentCode(fieldOfStudyDTO.getDepartment()));
			fieldOfStudyRepository.save(fieldOfStudy);
		} else {
			throw new RuntimeException("FieldOfStudy not found");
		}
	}

	@Transactional
	public ResponseEntity<?> deleteFieldOfStudy(DeleteFieldOfStudyRequest request) {
	    FieldOfStudyEntity fieldOfStudy = fieldOfStudyRepository.findById(request.getId())
	            .orElseThrow(() -> new EntityNotFoundException("FieldOfStudy not found"));

	    List<EducationProgramEntity> educationPrograms = fieldOfStudy.getEducationPrograms();
	    int totalPrograms = educationPrograms.size();

	    Map<String, Object> response = new HashMap<>();
	    Map<String, Object> data = new HashMap<>();
	    
	    if (totalPrograms == 0) {
	        fieldOfStudyRepository.delete(fieldOfStudy);
	    } else {
	        long unassignedCount = educationPrograms.stream()
	                .filter(program -> program.getLecturer() == null)
	                .count();
	        long assignedCount = totalPrograms - unassignedCount;

	        if (request.isConfirm()) {
	            fieldOfStudyRepository.delete(fieldOfStudy);
	        } else if (unassignedCount > 0 && unassignedCount==totalPrograms) {
	            data.put("unassigned", unassignedCount);
	            response.put("data", data);
	            response.put("status", 428);
//	            return ResponseEntity.status(HttpStatus.OK).body(response);
	            return ResponseEntity.status(HttpStatus.PRECONDITION_REQUIRED).body(response);
	        } else if (assignedCount > 0) {
	            data.put("unassigned", unassignedCount);
	            data.put("assigned", assignedCount);
	            data.put("total", totalPrograms);
	            response.put("data", data);
	            response.put("status", 403);
//	            return ResponseEntity.status(HttpStatus.OK).body(response);
	            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
	        }
	    }

	    List<FieldOfStudyEntity> remainingFieldsOfStudy = fieldOfStudyRepository.findAll();
	    List<FieldOfStudyDTO> result = remainingFieldsOfStudy.stream()
	            .map(fieldOfStudyConverter::convertToDTO)
	            .collect(Collectors.toList());
	    
	    return ResponseEntity.ok(result);
	}

}
