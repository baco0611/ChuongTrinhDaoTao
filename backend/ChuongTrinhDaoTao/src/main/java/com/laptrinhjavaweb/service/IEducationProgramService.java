package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.response.SearchProgramResponse;

public interface IEducationProgramService {
	EducationProgramDTO findbyIdProgram(Long programId) throws Exception;

	EducationProgramDTO save(EducationProgramDTO ctdtDTO) throws Exception;

	List<EducationProgramDTO> findAll();
	
	SearchProgramResponse searchPrograms(String keyword, String department, int status, int pageSize, int pageOrder) throws Exception;
	
	SearchProgramResponse managePrograms(String keyword, String department,String lectureCode, int pageSize, int pageOrder) throws Exception;
}
