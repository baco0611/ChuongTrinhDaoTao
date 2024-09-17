package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.SpecializationConverter;
import com.laptrinhjavaweb.dto.SpecializationDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.repository.SpecializationTrainingRepository;
import com.laptrinhjavaweb.response.SpecializationUpdateResponse;

@Service
public class SpecializationService {

	@Autowired
	private SpecializationTrainingRepository specializationRepository;

	@Autowired
	EducationProgramRepository educationProgramRepository;
	@Autowired
	private SpecializationConverter specializationConverter;

	public List<SpecializationDTO> getSpecializationsByProgramId(Long programId) {
		List<SpecializationTrainingEntity> specializations = specializationRepository
				.findByEducationProgram_ProgramId(programId);
		return specializations.stream().map(specializationConverter::toDTO).collect(Collectors.toList());
	}

	public SpecializationUpdateResponse updateSpecialization(SpecializationDTO request) {
		SpecializationUpdateResponse response = new SpecializationUpdateResponse();
		try {
			SpecializationTrainingEntity specializationEntity = specializationRepository
					.findById(request.getSpecializationId())
					.orElseThrow(() -> new RuntimeException("Không tìm thấy chuyên ngành"));

			// Cập nhật dữ liệu
			specializationEntity.setSpecializationName(request.getSpecializationName());

			// Lưu lại
			specializationRepository.save(specializationEntity);

			response.setMessage(null);
			response.setStatus(200);
		} catch (Exception e) {
			response.setMessage(e.getMessage());
			response.setStatus(500);
		}

		return response;
	}

	public SpecializationTrainingEntity createSpecialization(Long programId) {
		// Find the EducationProgramEntity by ID
		Optional<EducationProgramEntity> programOpt = educationProgramRepository.findById(programId);
		if (programOpt.isEmpty()) {
			throw new RuntimeException("Program not found");
		}

		EducationProgramEntity program = programOpt.get();

		// Create and save the new SpecializationTrainingEntity
		SpecializationTrainingEntity newSpecialization = new SpecializationTrainingEntity();
		newSpecialization.setEducationProgram(program);
		newSpecialization.setSpecializationName(""); // Set name to empty initially
		return specializationRepository.save(newSpecialization);
	}
	
	 public List<SpecializationDTO> deleteSpecialization(Long specializationId) {
	        // Find the specialization by ID
	        SpecializationTrainingEntity specialization = specializationRepository.findById(specializationId)
	                .orElseThrow(() -> new RuntimeException("Không tìm thấy chuyên ngành"));

	        // Delete the specialization
	        specializationRepository.delete(specialization);

	        // Fetch all remaining specializations
	        List<SpecializationTrainingEntity> specializations = specializationRepository.findAll();

	        // Convert entities to DTOs
	        List<SpecializationDTO> specializationDTOs = new ArrayList<>();
	        for (SpecializationTrainingEntity spec : specializations) {
	            SpecializationDTO dto = new SpecializationDTO();
	            dto.setSpecializationId(spec.getSpecializationId());
	            dto.setSpecializationName(spec.getSpecializationName());
	            specializationDTOs.add(dto);
	        }

	        return specializationDTOs;
	    }

}
