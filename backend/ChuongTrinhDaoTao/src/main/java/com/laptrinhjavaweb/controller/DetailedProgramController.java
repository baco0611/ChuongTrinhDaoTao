package com.laptrinhjavaweb.controller;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.service.impl.DetailedProgramService;

@RestController
@RequestMapping("/api/programs")
public class DetailedProgramController {

    @Autowired
    private DetailedProgramService detailedProgramService;

    @GetMapping("/{programId}/details")
    public ResponseEntity<?> getDetailedPrograms(@PathVariable Long programId) {
        List<DetailedProgramDTO> programs = detailedProgramService.getProgramsByProgramId(programId);

        Map<String, Object> response = new HashMap<>();
        response.put("data", programs);
        response.put("status", 200);

        return ResponseEntity.ok(response);
    }
}