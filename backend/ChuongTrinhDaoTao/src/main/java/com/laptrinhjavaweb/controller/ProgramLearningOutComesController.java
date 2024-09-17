package com.laptrinhjavaweb.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

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

import com.laptrinhjavaweb.converter.ProgramLearningOutcomeConverter;
import com.laptrinhjavaweb.dto.ProgramLearningOutComesDTO;
import com.laptrinhjavaweb.dto.ProgramLearningOutcomeDTO;
import com.laptrinhjavaweb.dto.UpdateProgramLearningOutcomeDTO;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.exception.ResourceNotFoundException;
import com.laptrinhjavaweb.request.CreateProgramLearningOutcomeRequest;
import com.laptrinhjavaweb.request.ProgramLearningOutComesUpdateRequest;
import com.laptrinhjavaweb.request.ProgramLearningOutcomeRequest;
import com.laptrinhjavaweb.request.UpdateLearningOutcomeRequest;
import com.laptrinhjavaweb.request.UpdateProgramLearningOutcomeRequest;
import com.laptrinhjavaweb.response.ApiResponse;
import com.laptrinhjavaweb.response.CreateProgramLearningOutComesReponse;
import com.laptrinhjavaweb.response.ProgramLearningOutComesGetResponse;
import com.laptrinhjavaweb.response.ProgramLearningOutComesResponse;
import com.laptrinhjavaweb.service.impl.ProgramLearningOutComesService;

@RestController
@RequestMapping("/api/programLearningOutcomes")
public class ProgramLearningOutComesController {

    @Autowired
    private ProgramLearningOutComesService service;

    @GetMapping("/{id}")
    public ResponseEntity<ProgramLearningOutComesResponse> getLearningOutcomesByProgramId(@PathVariable("id") Long programId) {
        List<ProgramLearningOutComesEntity> outcomes = service.getLearningOutcomesByProgramId(programId);

        List<ProgramLearningOutcomeDTO> data = outcomes.stream()
                .map(ProgramLearningOutcomeConverter::convertToDTO)
                .collect(Collectors.toList());

        ProgramLearningOutComesResponse response = new ProgramLearningOutComesResponse();
        response.setData(data);
        response.setStatus(200);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/update")
    public ResponseEntity<ApiResponse> updateLearningOutcome(@RequestBody UpdateProgramLearningOutcomeRequest request) {
        try {
            service.updateLearningOutcome(request.getId(), request.getContent());
            ApiResponse response = new ApiResponse(null, HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            ApiResponse response = new ApiResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse response = new ApiResponse("An error occurred while updating ProgramLearningOutComes", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createLearningOutcome(@RequestBody CreateProgramLearningOutcomeRequest request) {
        try {
            ProgramLearningOutComesEntity newEntity = service.createLearningOutcome(request);
            List<ProgramLearningOutComesDTO> updatedList = service.getAllLearningOutcomes();
            ProgramLearningOutComesDTO newDto = ProgramLearningOutcomeConverter.convertToDTO1(newEntity);
            //newDto.setContent(""); // Set content to empty
            //updatedList.add(newDto);

            // Build response
            CreateProgramLearningOutComesReponse response = new CreateProgramLearningOutComesReponse(updatedList, HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse response = new ApiResponse("An error occurred while creating ProgramLearningOutComes", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteLearningOutcome(@PathVariable Long id) {
        try {
            // Xóa phần tử dựa trên ID
            service.deleteLearningOutcome(id);

            // Lấy danh sách cập nhật sau khi xóa
            List<ProgramLearningOutComesDTO> updatedList = service.getAllLearningOutcomes();

            // Tạo phản hồi
            CreateProgramLearningOutComesReponse response = new CreateProgramLearningOutComesReponse(updatedList, HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            // Xử lý khi không tìm thấy phần tử để xóa
            ApiResponse response = new ApiResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse response = new ApiResponse("An error occurred while deleting ProgramLearningOutComes", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
    
    @PostMapping("/batch-update")
    public ResponseEntity<?> updateLearningOutcomes(@RequestBody List<UpdateProgramLearningOutcomeDTO> dtos) {
        String errorMessage = service.updateProgramLearningOutcomes(dtos);

        if (errorMessage != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
                new ApiResponse(errorMessage, 400)
            );
        }

        return ResponseEntity.ok(new ApiResponse(null, 200));
    }
    
    @GetMapping("/program/{programId}")
    public ResponseEntity<?> getAllLearningOutcomesByProgramId(@PathVariable Long programId) {
        List<ProgramLearningOutComesGetResponse> learningOutcomes = service.getAllLearningOutcomesByProgramId(programId);
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", learningOutcomes);
        response.put("status", 200);

        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/edit")
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