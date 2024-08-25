package com.laptrinhjavaweb.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;

public interface ILecturerService {
	Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) ;
	void updateLecturerRoles(Long lecturerId, List<String> roles) ;
	LecturersDTO getLecturerDetails(Long lecturerId);
	LecturersEntity findByLecturerCode(String lecturerCode);
}
