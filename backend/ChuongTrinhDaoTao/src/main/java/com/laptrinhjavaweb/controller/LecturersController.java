package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.converter.LecturersConverter;
import com.laptrinhjavaweb.dto.LecturersDTO;
import com.laptrinhjavaweb.dto.PageInformation;
import com.laptrinhjavaweb.entity.LecturersEntity;
import com.laptrinhjavaweb.request.ChangePasswordRequest;
import com.laptrinhjavaweb.request.LecturerRequestDTO;
import com.laptrinhjavaweb.request.LecturerSearchRequestDTO;
import com.laptrinhjavaweb.request.LecturersInfoRequest;
import com.laptrinhjavaweb.request.UpdateLecturerRequest;
import com.laptrinhjavaweb.request.UpdateRolesRequest;
import com.laptrinhjavaweb.response.ErrorResponse;
import com.laptrinhjavaweb.response.LecturerResponseDTO;
import com.laptrinhjavaweb.response.ListLecturersResponse;
import com.laptrinhjavaweb.response.RefreshTokenResponse;
import com.laptrinhjavaweb.service.ILecturerService;
import com.laptrinhjavaweb.service.impl.JwtService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/lecturer")
public class LecturersController {
	@Autowired
	private ILecturerService lecturersService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private LecturersConverter lecturersConverter;

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

			// Get lại dữ liệu sau khi update
			lecturer = lecturersService.getLecturerDetails(request.getLecturerId());
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

	@GetMapping("/refresh")
	public ResponseEntity<?> refreshToken(@RequestHeader("Authorization") String token) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			String lecturersCode = jwtService.extractLecturersCode(token);
			LecturersEntity lecturersEntity = lecturersService.findByLecturerCode(lecturersCode);
			if (lecturersEntity == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lecturer not found");
			}
			if (!jwtService.isTokenValid(token, lecturersEntity)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
			}
			String newToken = jwtService.generateToken(lecturersEntity);
			LecturersDTO lecturersDTO = lecturersConverter.convertToDTO(lecturersEntity);
			RefreshTokenResponse refreshTokenResponse = new RefreshTokenResponse(lecturersDTO, newToken, 200);
			return ResponseEntity.ok(refreshTokenResponse);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Error occurred while refreshing token");
		}
	}

	@GetMapping("/roles")
	public ResponseEntity<?> getLecturersRoles(@RequestHeader("Authorization") String token) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			String lecturersCode = jwtService.extractLecturersCode(token);
			LecturersEntity lecturersEntity = lecturersService.findByLecturerCode(lecturersCode);
			if (lecturersEntity == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lecturer not found");
			}
			if (!jwtService.isTokenValid(token, lecturersEntity)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
			}
			List<String> roles = lecturersEntity.getRoles().stream().map(role -> role.name()).toList();
			Map<String, Object> response = new HashMap<>();
			response.put("data", roles);
			response.put("status", 200);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while retrieving roles");
		}
	}

	@GetMapping("/info")
	public ResponseEntity<?> getLecturerInfo(@RequestHeader("Authorization") String token) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			String lecturersCode = jwtService.extractLecturersCode(token);
			LecturersEntity lecturersEntity = lecturersService.findByLecturerCode(lecturersCode);
			if (lecturersEntity == null) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Lecturer not found");
			}
			if (!jwtService.isTokenValid(token, lecturersEntity)) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid or expired token");
			}
			LecturersDTO lecturersDTO = lecturersConverter.convertToDTO(lecturersEntity);
			Map<String, Object> response = new HashMap<>();
			response.put("data", lecturersDTO);
			response.put("status", 200);
			return ResponseEntity.ok(response);

		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("An error occurred while retrieving lecturer info");
		}
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateLecturerInfo(@RequestHeader("Authorization") String token,
			@RequestBody UpdateLecturerRequest updateRequest) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			Map<String, Object> response = lecturersService.updateLecturerInfo(token, updateRequest);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
					Map.of("message", "An error occurred while updating the lecturer's information", "status", 500));
		}
	}

	@PostMapping("/change-password")
	public ResponseEntity<?> changePassword(@RequestHeader("Authorization") String token,
			@RequestBody ChangePasswordRequest changePasswordRequest) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			Map<String, Object> response = lecturersService.changePassword(token, changePasswordRequest);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "An error occurred while changing the password", "status", 500));
		}
	}

	@GetMapping("/checkLecturerCode/{lecturerCode}")
	public ResponseEntity<?> checkLecturerCode(@PathVariable("lecturerCode") String lecturerCode) {
		Map<String, Object> response = new HashMap<>();
		Boolean check = lecturersService.checLecturerCode(lecturerCode);
		if (!check) {
			response.put("status", HttpStatus.OK.value());
			response.put("message", "OKE");
			return ResponseEntity.ok(response);
		} else {
			response.put("status", HttpStatus.CONFLICT.value());
			response.put("message", "Đã tồn tại mã giảng viên");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}

	}

	@DeleteMapping("/delete/{lecturerCode}")
	public ResponseEntity<?> deleteLecturer(@RequestHeader("Authorization") String token,
			@PathVariable("lecturerCode") String lecturerCode) {
		try {
			if (token.startsWith("Bearer ")) {
				token = token.substring(7);
			}
			Map<String, Object> response = lecturersService.deleteLecturer(token, lecturerCode);
			return ResponseEntity.ok(response);
		} catch (Exception e) {
			e.printStackTrace();
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(Map.of("message", "An error occurred while changing the password", "status", 500));
		}
	}

	@PostMapping("/create")
	public ResponseEntity<?> createLecturer(@Valid @RequestBody LecturerRequestDTO request, BindingResult result) {
	    if (result.hasErrors()) {
	    	 Map<String, Object> data = new HashMap<>();
	 	    data.put("lecturerCode", null);
	 	    data.put("department", null);
	 	    data.put("email", null);
	 	    data.put("firstName", null);
	 	    data.put("lastName", null);
	 	    data.put("password", null);
	 	   
	    	result.getFieldErrors().forEach(error -> {
	            data.put(error.getField(), Map.of("message", error.getDefaultMessage()));
	        });   
	        return ResponseEntity.badRequest().body(Map.of("data", data, "status", 400));
	    }
	    Map<String, Object> response = lecturersService.createLecturer(request);
	    int status = (int) response.get("status");
	    return ResponseEntity.status(status).body(response);
	}
	
	@PostMapping("/search")
    public ResponseEntity<?> searchLecturers(@RequestBody LecturerSearchRequestDTO request) {
        List<LecturerResponseDTO> lecturers = lecturersService.searchLecturers(request);
        return ResponseEntity.ok(Map.of("data", lecturers, "status", 200));
    }


}
