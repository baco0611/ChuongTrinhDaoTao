package com.laptrinhjavaweb.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.laptrinhjavaweb.dto.LecturersDTO;

public interface ILecturerService {
	Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) ;
}
