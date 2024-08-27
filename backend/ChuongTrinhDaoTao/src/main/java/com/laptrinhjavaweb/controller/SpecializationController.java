package com.laptrinhjavaweb.controller;

import java.util.List;

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

import com.laptrinhjavaweb.dto.SpecializationDTO;
import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;
import com.laptrinhjavaweb.request.CreateSpecializationRequest;
import com.laptrinhjavaweb.request.DeleteSpecializationRequest;
import com.laptrinhjavaweb.response.SpecializationResponse;
import com.laptrinhjavaweb.response.SpecializationUpdateResponse;
import com.laptrinhjavaweb.service.impl.SpecializationService;

@RestController
@RequestMapping("/api/specialization")
public class SpecializationController {

    @Autowired
    private SpecializationService specializationService;

    @GetMapping("/{programId}")
    public ResponseEntity<Object> getSpecializationsByProgramId(@PathVariable("programId") Long programId) {
        try {
            List<SpecializationDTO> specializations = specializationService.getSpecializationsByProgramId(programId);
            Object jsonData = new Object() {
                public final List<SpecializationDTO> data = specializations;
                public final int status = HttpStatus.OK.value();
            };
            return ResponseEntity.ok(jsonData);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"status\": " + HttpStatus.INTERNAL_SERVER_ERROR.value() + "}");
        }
    }
    
    @PostMapping("/update")
    public ResponseEntity<SpecializationUpdateResponse> updateSpecialization(
            @RequestBody SpecializationDTO request) {
        SpecializationUpdateResponse response = specializationService.updateSpecialization(request);
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/create")
    public ResponseEntity<?> createSpecialization(@RequestBody CreateSpecializationRequest specializationDTO) {
        try {
            // Create a new specialization
            SpecializationTrainingEntity newSpecialization = specializationService.createSpecialization(specializationDTO.getProgramId());
            
            // Get all specializations for the program
            List<SpecializationDTO> allSpecializations = specializationService.getSpecializationsByProgramId(specializationDTO.getProgramId());
            
            // Set name to empty for newly created specialization
            allSpecializations.forEach(specialization -> {
                if (specialization.getSpecializationId().equals(newSpecialization.getSpecializationId())) {
                    specialization.setSpecializationName("");
                }
            });

            return ResponseEntity.ok(new SpecializationResponse(allSpecializations, 200));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(new SpecializationResponse(null, 500));
        }
    }
    
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteSpecialization(@RequestBody DeleteSpecializationRequest request) {
        try {
            List<SpecializationDTO> specializations = specializationService.deleteSpecialization(request.getSpecializationId());

            // Creating the response object
            SpecializationResponse response = new SpecializationResponse();
            response.setData(specializations);
            response.setStatus(200);

            return ResponseEntity.ok().body(response);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error deleting specialization: " + e.getMessage());
        }
    }
    
    
}