package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dataEnum.Role;
import com.laptrinhjavaweb.dto.FieldOfStudyDTO;
import com.laptrinhjavaweb.entity.LecturersEntity;
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
        try {
            // Kiểm tra token
            if (token == null || !token.startsWith("Bearer ")) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("data", null, "message", "Token is missing or invalid", "status", 401)
                );
            }

            token = token.substring(7); // Lấy giá trị token

            // Lấy mã giảng viên từ token
            String lecturersCode = jwtService.extractLecturersCode(token);
            if (lecturersCode == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("data", null, "message", "Lecturer code is missing", "status", 401)
                );
            }

            LecturersEntity lecturersEntity = lecturersService.findByLecturerCode(lecturersCode);

            // Kiểm tra xem giảng viên có tồn tại hay không
            if (lecturersEntity == null) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("data", null, "message", "Lecturer not found", "status", 401)
                );
            }

            // Kiểm tra tính hợp lệ của token
            if (!jwtService.isTokenValid(token, lecturersEntity)) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(
                        Map.of("data", null, "message", "Invalid or expired token", "status", 401)
                );
            }

            // Kiểm tra quyền của giảng viên
            List<Role> roles = lecturersEntity.getRoles();
            if (roles == null || roles.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        Map.of("data", null, "message", "No roles assigned to the lecturer", "status", 403)
                );
            }

            boolean isAdmin = roles.stream()
                    .anyMatch(role -> role.name().equals("ADMIN"));

            if (!isAdmin) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body(
                        Map.of("data", null, "message", "Bạn không có quyền truy cập", "status", 403)
                );
            }

            // Nếu là admin, tiếp tục lấy dữ liệu
            List<FieldOfStudyDTO> fieldOfStudies = fieldOfStudyService.getAllFieldsOfStudy();
            
            // Kiểm tra kết quả từ dịch vụ
            if (fieldOfStudies == null) {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body(Map.of("data", null, "message", "No fields of study found", "status", 500));
            }

            Map<String, Object> response = new HashMap<>();
            response.put("data", fieldOfStudies);
            response.put("status", 200);

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace(); // In ra thông tin lỗi
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("data", null, "message", "An error occurred while retrieving fields of study", "status", 500));
        }
    }




}
