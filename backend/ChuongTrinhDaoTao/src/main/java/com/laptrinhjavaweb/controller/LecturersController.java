package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.Map;

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
import com.laptrinhjavaweb.request.UpdateRolesRequest;
import com.laptrinhjavaweb.response.ErrorResponse;
import com.laptrinhjavaweb.response.ListLecturersResponse;
import com.laptrinhjavaweb.service.ILecturerService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/lecturer")
public class LecturersController {
	@Autowired
	private ILecturerService lecturersService;

	@PostMapping("/getAll")
	public ResponseEntity<?> searchLecturers(@RequestBody LecturersInfoRequest request) {
		try {
			Pageable pageable = PageRequest.of(request.getPageOrder() - 1, 20);
			Page<LecturersDTO> result = lecturersService.findLecturers(request.getDepartment(), request.getKeyword(),
					pageable);
			PageInformation pageInfo = PageInformation.builder().numOfElement(result.getNumberOfElements())
					.pageSize(pageable.getPageSize()).offset(result.getNumber()).firstPage(result.isFirst())
					.lastPage(result.isLast()).pageOrder(request.getPageOrder()).totalPages(result.getTotalPages())
					.totalElements(result.getTotalElements()).build();
			ListLecturersResponse response = ListLecturersResponse.builder().data(result.getContent())
					.pageInformation(pageInfo).status(HttpStatus.OK.value()).build();

			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(),
					"Có lỗi xảy ra, vui lòng thử lại sau.");
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
		}
	}

	@PostMapping("/updateRoles")
	public ResponseEntity<?> updateRoles(@RequestBody UpdateRolesRequest request) {
		try {
			// Kiểm tra xem giảng viên có tồn tại không
			LecturersDTO lecturer = lecturersService.getLecturerDetails(request.getLecturerId());

			// Nếu giảng viên tồn tại, tiến hành cập nhật vai trò
			lecturersService.updateLecturerRoles(request.getLecturerId(), request.getRole());
			Map<String, Object> response = new HashMap<>();
			response.put("data", lecturer);
			response.put("message", null);
			response.put("status", HttpStatus.OK.value());
			return ResponseEntity.ok(response);
		} catch (EntityNotFoundException e) {
			Map<String, Object> response = new HashMap<>();
			response.put("data", null);
			response.put("message", "Giảng viên không tồn tại.");
			response.put("status", HttpStatus.NOT_FOUND.value());
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
		} catch (SecurityException e) {
			Map<String, Object> response = new HashMap<>();
			response.put("data", null);
			response.put("message", "Bạn không có quyền cập nhật vai trò.");
			response.put("status", HttpStatus.FORBIDDEN.value());
			return ResponseEntity.status(HttpStatus.FORBIDDEN).body(response);
		} catch (Exception e) {
			e.printStackTrace();
			Map<String, Object> response = new HashMap<>();
			response.put("data", null);
			response.put("message", "Đã xảy ra lỗi khi cập nhật vai trò.");
			response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
		}
	}

}
