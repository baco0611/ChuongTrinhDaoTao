package com.laptrinhjavaweb.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.dto.PageInformation;
import com.laptrinhjavaweb.request.LecturersInfoRequest;
import com.laptrinhjavaweb.response.ErrorResponse;
import com.laptrinhjavaweb.response.ListLecturersResponse;
import com.laptrinhjavaweb.service.ILecturerService;

@RestController
@RequestMapping("/api/lecturer")
public class LecturersController {
	@Autowired
    private ILecturerService lecturersService;
	
	@PostMapping("/getAll")
	public ResponseEntity<?> searchLecturers(@RequestBody LecturersInfoRequest request) {
	    try {
	        Pageable pageable = PageRequest.of(request.getPageOrder() - 1, 20);
	        Page<LecturersDTO> result = lecturersService.findLecturers(request.getDepartment(), request.getKeyword(), pageable);
	        PageInformation pageInfo = PageInformation.builder()
	            .numOfElement(result.getNumberOfElements())
	            .pageSize(pageable.getPageSize())
	            .offset(result.getNumber())
	            .firstPage(result.isFirst())
	            .lastPage(result.isLast())
	            .pageOrder(request.getPageOrder())
	            .totalPages(result.getTotalPages())
	            .totalElements(result.getTotalElements())
	            .build();
	        ListLecturersResponse response = ListLecturersResponse.builder()
	            .data(result.getContent())
	            .pageInformation(pageInfo)
	            .status(HttpStatus.OK.value())
	            .build();

	        return ResponseEntity.ok(response);
	    } catch (Exception e) {
	        e.printStackTrace();
	        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Có lỗi xảy ra, vui lòng thử lại sau.");
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
	    }
	}

}
