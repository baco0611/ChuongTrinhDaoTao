package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.FieldOfStudyDTO;
import com.laptrinhjavaweb.request.DeleteFieldOfStudyRequest;
import com.laptrinhjavaweb.service.ILecturerService;
import com.laptrinhjavaweb.service.impl.FieldOfStudyService;
import com.laptrinhjavaweb.service.impl.JwtService;

@RestController
@RequestMapping("/api/fields")
public class FieldOfStudyController {

	@Autowired
	private FieldOfStudyService fieldOfStudyService;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private ILecturerService lecturersService;

	@GetMapping("/getAll")
	public ResponseEntity<?> getAllFieldsOfStudy(@RequestHeader("Authorization") String token) {
		Map<String, Object> response = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));
		if (!isAdmin) {
			response.put("message", "Bạn không có quyền chỉnh sửa thông tin");
			response.put("status", 403);
			return ResponseEntity.ok(response);
		}
		List<FieldOfStudyDTO> fieldOfStudies = fieldOfStudyService.getAllFieldsOfStudy();
		response.put("data", fieldOfStudies);
		response.put("status", 200);
		return ResponseEntity.ok(response);
	}

	@GetMapping("/exists/{fieldCode}")
	public ResponseEntity<?> checkFieldOfStudyExists(@PathVariable String fieldCode) {
		boolean exists = fieldOfStudyService.existsByFieldCode(fieldCode);

		if (exists) {
			return ResponseEntity.status(HttpStatus.CONFLICT).body(Map.of("message", "Đã tồn tại", "status", 409));
		} else {
			return ResponseEntity.ok(Map.of("message", "OK", "status", 200));
		}
	}

	@PostMapping("/create")
	public ResponseEntity<?> createFieldOfStudy() {
		Map<String, Object> response = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));

		if (!isAdmin) {
			response.put("message", "Bạn không có quyền tạo thông tin");
			response.put("status", 403);
			return ResponseEntity.ok(response);
		}

		fieldOfStudyService.createEmptyFieldOfStudy();

		List<FieldOfStudyDTO> fieldOfStudies = fieldOfStudyService.getAllFieldsOfStudy();

		response.put("data", fieldOfStudies);
		response.put("status", 200);
		return ResponseEntity.ok(response);
	}

	@PostMapping("/update")
	public ResponseEntity<?> updateFieldOfStudy(@RequestBody FieldOfStudyDTO fieldOfStudyDTO) {
		Map<String, Object> response = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));

		if (!isAdmin) {
			response.put("message", "Bạn không có quyền cập nhật thông tin");
			response.put("status", 403);
			return ResponseEntity.ok(response);
		}
		fieldOfStudyService.updateFieldOfStudy(fieldOfStudyDTO);
		List<FieldOfStudyDTO> fieldOfStudies = fieldOfStudyService.getAllFieldsOfStudy();
		response.put("data", fieldOfStudies);
		response.put("status", 200);
		return ResponseEntity.ok(response);
	}

	@DeleteMapping("/delete")
	public ResponseEntity<?> deleteFieldOfStudy(@RequestBody DeleteFieldOfStudyRequest request) {
		Map<String, Object> response = new HashMap<>();
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		boolean isAdmin = authentication.getAuthorities().stream()
				.anyMatch(auth -> auth.getAuthority().equals("ADMIN"));

		if (!isAdmin) {
			response.put("message", "Bạn không có quyền cập nhật thông tin");
			response.put("status", 403);
			return ResponseEntity.ok(response);
		}
		return fieldOfStudyService.deleteFieldOfStudy(request);
	}
}
