package com.laptrinhjavaweb.controller;

import java.util.List;
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

import com.laptrinhjavaweb.converter.ProgramObjectiveConverter;
import com.laptrinhjavaweb.dto.ProgramObjectiveDTO;
import com.laptrinhjavaweb.dto.UpdateProgramObjectiveDTO;
import com.laptrinhjavaweb.entity.ProgramObjectiveEntity;
import com.laptrinhjavaweb.exception.ResourceNotFoundException;
import com.laptrinhjavaweb.request.CreateProgramObjectiveRequest;
import com.laptrinhjavaweb.request.UpdateProgramObjectiveRequest;
import com.laptrinhjavaweb.response.ApiResponse;
import com.laptrinhjavaweb.response.CreateProgramObjectiveReponse;
import com.laptrinhjavaweb.response.ProgramObjectiveResponse;
import com.laptrinhjavaweb.service.impl.ProgramObjectiveService;

@RestController
@RequestMapping("/api/programObjective")
public class ProgramObjectiveController {
	
	@Autowired
	private ProgramObjectiveService programObjectiveService;

	@GetMapping("/{id}")
    public ResponseEntity<ProgramObjectiveResponse> getLearningOutcomesByProgramId(@PathVariable("id") Long programId) {
        List<ProgramObjectiveEntity> outcomes = programObjectiveService.getLearningOutcomesByProgramId(programId);

        List<ProgramObjectiveDTO> data = outcomes.stream()
                .map(ProgramObjectiveConverter::convertToDTO)
                .collect(Collectors.toList());

        ProgramObjectiveResponse response = new ProgramObjectiveResponse();
        response.setData(data);
        response.setStatus(200);

        return ResponseEntity.ok(response);
    }
	
	@PostMapping("/update")
    public ResponseEntity<ApiResponse> updateLearningOutcome(@RequestBody UpdateProgramObjectiveRequest request) {
        try {
            programObjectiveService.updateLearningOutcome(request.getId(), request.getContent(), request.getSymbol());
            ApiResponse response = new ApiResponse(null, HttpStatus.OK.value());
            return ResponseEntity.ok(response);
        } catch (ResourceNotFoundException e) {
            ApiResponse response = new ApiResponse(e.getMessage(), HttpStatus.NOT_FOUND.value());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception e) {
            e.printStackTrace();
            ApiResponse response = new ApiResponse("An error occurred while updating ProgramObjective", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
	
	 @PostMapping("/create")
	    public ResponseEntity<?> createLearningOutcome(@RequestBody CreateProgramObjectiveRequest request) {
	        try {
	            ProgramObjectiveEntity newEntity = programObjectiveService.createLearningOutcome(request);
	            List<ProgramObjectiveDTO> updatedList = programObjectiveService.getAll();
	            ProgramObjectiveDTO newDto = ProgramObjectiveConverter.convertToDTO(newEntity);
	            CreateProgramObjectiveReponse response = new CreateProgramObjectiveReponse(updatedList, HttpStatus.OK.value());
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
           programObjectiveService.deleteLearningOutcome(id);

           // Lấy danh sách cập nhật sau khi xóa
           List<ProgramObjectiveDTO> updatedList = programObjectiveService.getAll();

           // Tạo phản hồi
           CreateProgramObjectiveReponse response = new CreateProgramObjectiveReponse(updatedList, HttpStatus.OK.value());
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
   public ResponseEntity<?> updateLearningOutcomes(@RequestBody List<UpdateProgramObjectiveDTO> dtos) {
       String errorMessage = programObjectiveService.updateProgramObjective(dtos);

       if (errorMessage != null) {
           return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(
               new ApiResponse(errorMessage, 400)
           );
       }

       return ResponseEntity.ok(new ApiResponse(null, 200));
   }
   

}
