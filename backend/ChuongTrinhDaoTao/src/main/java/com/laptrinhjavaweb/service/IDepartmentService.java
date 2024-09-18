package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.DepartmentDTO;
import com.laptrinhjavaweb.dto.DepartmentDetailDTO;
import com.laptrinhjavaweb.response.ListLecturersOfDepartmentResponse;

public interface IDepartmentService {
	List<DepartmentDTO> findAll();
	ListLecturersOfDepartmentResponse getDepartmentDetails();
	void updateDepartmentManager(Long departmentId, Long lecturerId) ;
}
