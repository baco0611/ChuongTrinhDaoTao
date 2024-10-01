package com.laptrinhjavaweb.service;

import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.request.ChangePasswordRequest;
import com.laptrinhjavaweb.request.UpdateLecturerRequest;

public interface ILecturerService {
	Page<LecturersDTO> findLecturers(String department, String keyWord, Pageable pageable) ;
	void updateLecturerRoles(Long lecturerId, List<String> roles) ;
	LecturersDTO getLecturerDetails(Long lecturerId);
	LecturersEntity findByLecturerCode(String lecturerCode);
	Map<String, Object> updateLecturerInfo(String token, UpdateLecturerRequest updateRequest) ;
    Map<String, Object> changePassword(String token, ChangePasswordRequest changePasswordRequest);
}
