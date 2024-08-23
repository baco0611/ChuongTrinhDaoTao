package com.laptrinhjavaweb.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.DepartmentDTO;
import com.laptrinhjavaweb.response.DepartmentResponse;
import com.laptrinhjavaweb.response.ErrorResponse;
import com.laptrinhjavaweb.service.IDepartmentService;

import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureException;

@RestController
@RequestMapping("/api/department")
public class DepartmentController {

    @Autowired
    private IDepartmentService departmentService;

    @GetMapping(value = "/getAll")
    public ResponseEntity<?> getAllDepartments() {
        try {	
            List<DepartmentDTO> lstDTO = departmentService.findAll();
            // Tạo đối tượng DepartmentResponse với dữ liệu và trạng thái thành công
            DepartmentResponse wrapper = DepartmentResponse.builder().data(lstDTO)
                    .status(HttpStatus.OK.value())
                    .build();
            // Kiểm tra dữ liệu
            if (lstDTO == null || lstDTO.isEmpty()) {
                return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
            } else {
            	return ResponseEntity.ok(wrapper);
            }
        } catch (SignatureException e) {
            // Xử lý lỗi khi chữ ký JWT không khớp
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Token không hợp lệ hoặc đã bị thay đổi.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (JwtException e) {
            // Xử lý các lỗi JWT khác
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.UNAUTHORIZED.value(), "Token không hợp lệ, vui lòng đăng nhập lại.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponse);
        } catch (Exception e) {
            e.printStackTrace();
            // Xử lý các ngoại lệ khác
            ErrorResponse errorResponse = new ErrorResponse(HttpStatus.INTERNAL_SERVER_ERROR.value(), "Có lỗi xảy ra, vui lòng thử lại sau.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}
