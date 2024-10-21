package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.request.ProgramLearningOutComesUpdateRequest;
import com.laptrinhjavaweb.request.ProgramLearningOutcomeRequest;
import com.laptrinhjavaweb.request.UpdateLearningOutcomeRequest;
import com.laptrinhjavaweb.response.ProgramLearningOutComesGetResponse;
import com.laptrinhjavaweb.service.impl.ProgramLearningOutComesService;

@RestController
@RequestMapping("/api/programLearningOutcomes")
public class ProgramLearningOutComesController {

    @Autowired
    private ProgramLearningOutComesService service;
    
    @GetMapping("/{programId}")
    public ResponseEntity<?> getAllLearningOutcomesByProgramId(@PathVariable Long programId) {
        List<ProgramLearningOutComesGetResponse> learningOutcomes = service.getAllLearningOutcomesByProgramId(programId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", learningOutcomes);
        response.put("status", 200);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/update")
    public ResponseEntity<?> updateLearningOutcome(@RequestBody ProgramLearningOutComesUpdateRequest request) {
        String message = service.updateLearningOutcome(request);

        Map<String, Object> response = new HashMap<>();
        response.put("message", message);
        response.put("status", 200);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/createPLO")
    public ResponseEntity<?> createProgramLearningOutcome(@RequestBody ProgramLearningOutcomeRequest request) {
        try {
            service.createProgramLearningOutcome(request);
            
            // Trả về danh sách PLO bao gồm phần tử mới tạo ra
            List<ProgramLearningOutComesGetResponse> programLearningOutcomes = service.getAllLearningOutcomesByProgramId(request.getProgramId());

            return ResponseEntity.ok().body(Map.of("data", programLearningOutcomes, "status", 200));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("message", e.getMessage(), "status", 500));
        }
    }
    
    @DeleteMapping("/deletePLO/{id}")
    public ResponseEntity<?> deleteProgramLearningOutcome(@PathVariable Long id) {
        try {
            ProgramLearningOutComesEntity entity = service.getLearningOutcomeById(id);
            Long programId = entity.getEducationProgram().getProgramId();
            service.deleteProgramLearningOutcome(id);
            // Trả về danh sách PLO sau khi xóa
            List<ProgramLearningOutComesGetResponse> programLearningOutcomes = service.getAllLearningOutcomesByProgramId(programId);
            return ResponseEntity.ok().body(Map.of(
                "data", programLearningOutcomes,
                "status", 200
            ));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of(
                "message", e.getMessage(),
                "status", 500
            ));
        }
    }
    
    @PostMapping("/updatePLOs")
    public ResponseEntity<?> updateLearningOutcomesPLOs(@RequestBody List<UpdateLearningOutcomeRequest> updates) {
        try {
            service.updateLearningOutcomes(updates);
            
            Map<String, Object> response = new HashMap<>();
            response.put("message", null);  // Hoặc bạn có thể để trống nếu không có thông báo lỗi
            response.put("status", 200);
            
            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("message", e.getMessage());
            errorResponse.put("status", 500);
            
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
}