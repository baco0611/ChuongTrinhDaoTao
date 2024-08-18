package com.laptrinhjavaweb.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.repository.LecturersRepository;
import com.laptrinhjavaweb.service.ILecturerService;

@Service
public class LecturerService implements ILecturerService{
	@Autowired
	private LecturersRepository lecturersRepository;

	@Autowired
	private LecturersConverter lecturersConverter; // Ensure this converter is updated to match new DTO

	@Override
	public Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) {
		Page<LecturersEntity> entitiesPage = lecturersRepository.findByDepartmentAndKeyWord(department, keyWord,
				pageable);
		return entitiesPage.map(entity -> lecturersConverter.convertToDTO(entity));
	}
}
