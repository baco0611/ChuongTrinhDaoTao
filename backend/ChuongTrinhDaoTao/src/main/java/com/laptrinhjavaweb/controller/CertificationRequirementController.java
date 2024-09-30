package com.laptrinhjavaweb.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.entity.CertificationRequirementEntity;
import com.laptrinhjavaweb.response.Response;
import com.laptrinhjavaweb.service.impl.CertificationRequirementService;

@RestController
@RequestMapping("/api/certification-requirements")
public class CertificationRequirementController {

    @Autowired
    private CertificationRequirementService certReqService;

    @GetMapping("/getAll")
    public ResponseEntity<Map<String, Object>> getAllCertificationRequirements() {
        Map<String, Object> response = certReqService.getAllCertificationRequirements();
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/create")
    public ResponseEntity<Map<String, Object>> createCertificationRequirements() {
        Map<String, Object> response = certReqService.getAllCertificationRequirements();
        return ResponseEntity.ok(response);
    }
    
    @PostMapping("/update")
    public ResponseEntity<?> updateCertificationRequirement(@RequestBody Map<String, Object> request) {
    	Long id = Long.valueOf(request.get("id").toString());
		String condition = request.get("condition").toString();
        String message = certReqService.updateCertificationRequirement(id, condition);
        return ResponseEntity.ok().body(new Response(message, 200));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteCertificationRequirement(@PathVariable Long id) {
        List<CertificationRequirementEntity> updatedList = certReqService.deleteCertificationRequirement(id);
        return ResponseEntity.ok().body(new Response(updatedList, 200));
    }
}
