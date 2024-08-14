package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.response.SearchProgramResponse;

public interface IEducationProgramService {
	EducationProgramDTO findbyIdProgram(Long programId) throws Exception;

	EducationProgramDTO save(EducationProgramDTO ctdtDTO) throws Exception;

	List<EducationProgramDTO> findAll();
	
	SearchProgramResponse searchPrograms(String keyword, String department, int pageSize, int pageOrder) throws Exception;
}
