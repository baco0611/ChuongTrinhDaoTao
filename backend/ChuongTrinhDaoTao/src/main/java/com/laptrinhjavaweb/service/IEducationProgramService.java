package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.request.UpdateEducationRequest;
import com.laptrinhjavaweb.response.EducationProgramUpdateResponse;
import com.laptrinhjavaweb.response.SearchProgramResponse;

public interface IEducationProgramService {
	EducationProgramDTO findbyIdProgram(Long programId) throws Exception;
	
	EducationProgramEntity findById(Long programId);

	EducationProgramDTO save(EducationProgramDTO ctdtDTO) throws Exception;

	List<EducationProgramDTO> findAll();
	
	SearchProgramResponse searchPrograms(String keyword, String department, int status, int pageSize, int pageOrder) throws Exception;
	
	SearchProgramResponse managePrograms(String keyword, String department, int status, int pageSize, int pageOrder) throws Exception;

	EducationProgramUpdateResponse updateEducationProgram(UpdateEducationRequest request);

	String getOverallObjectives(Long programId);

	String updateOverallObjectives(Long programId, String overallObjectives);
}
