package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.DepartmentDTO;

public interface IDepartmentService {
	List<DepartmentDTO> findAll();
}
