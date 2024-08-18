package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.DepartmentConverter;
import com.laptrinhjavaweb.dto.DepartmentDTO;
import com.laptrinhjavaweb.entity.DepartmentEntity;
import com.laptrinhjavaweb.repository.DepartmentRepository;
import com.laptrinhjavaweb.service.IDepartmentService;

@Service
public class DepartmentService implements IDepartmentService {

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private DepartmentConverter departmentConverter;

	@Override
	public List<DepartmentDTO> findAll() {
		List<DepartmentDTO> lstDTO = new ArrayList<DepartmentDTO>();
		List<DepartmentEntity> lstEntity = departmentRepository.findAll();
		for (DepartmentEntity departmentEntity : lstEntity) {
			lstDTO.add(departmentConverter.toDTO(departmentEntity));
		}
		return lstDTO;
	}

	public DepartmentEntity getDepartmentFromSomewhere(Long departmentId) {
		return departmentRepository.findById(departmentId)
				.orElseThrow(() -> new RuntimeException("Department not found"));
	}
}
