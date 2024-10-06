package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.ProgramObjectiveConverter;
import com.laptrinhjavaweb.dto.ProgramObjectiveDTO;
import com.laptrinhjavaweb.dto.UpdateProgramObjectiveDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.ProgramObjectiveEntity;
import com.laptrinhjavaweb.exception.ResourceNotFoundException;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.repository.ProgramObjectiveRepository;
import com.laptrinhjavaweb.request.CreateProgramObjectiveRequest;

@Service
public class ProgramObjectiveService {
	@Autowired
	private ProgramObjectiveRepository programObjectiveRepository;
	
	@Autowired
	private EducationProgramRepository educationProgramRepository;
	
	@Autowired
	private ProgramObjectiveConverter programObjectiveConverter;
	
	public List<ProgramObjectiveEntity> getLearningOutcomesByProgramId(Long programId) {
        return programObjectiveRepository.findByEducationProgramProgramId(programId);
    }
    
    public ProgramObjectiveEntity updateLearningOutcome(Long id, String content, String symbol) {
        ProgramObjectiveEntity entity = programObjectiveRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("ProgramObjective not found with id: " + id));

        entity.setContent(content);
        entity.setSymbol(symbol);
        return programObjectiveRepository.save(entity);
    }
    
    public ProgramObjectiveEntity createLearningOutcome(CreateProgramObjectiveRequest request) {
        EducationProgramEntity programEntity = educationProgramRepository.findById(request.getProgramId())
                .orElseThrow(() -> new ResourceNotFoundException("Program with ID " + request.getProgramId() + " not found"));

        ProgramObjectiveEntity newEntity = new ProgramObjectiveEntity();
        newEntity.setSymbol(request.getSymbol());
        newEntity.setContent(""); // Initialize content as empty
        newEntity.setObjectiveType(request.getType());
        newEntity.setEducationProgram(programEntity);

        return programObjectiveRepository.save(newEntity);
    }
    
    public List<ProgramObjectiveDTO> getAll() {
        List<ProgramObjectiveEntity> entities = programObjectiveRepository.findAll();
        return entities.stream()
                .map(ProgramObjectiveConverter::convertToDTO)
                .collect(Collectors.toList());
    }
    
    public void deleteLearningOutcome(Long id) {
        if (programObjectiveRepository.existsById(id)) {
            programObjectiveRepository.deleteById(id);
        } else {
            throw new ResourceNotFoundException("ProgramLearningOutComes not found with id: " + id);
        }
    }
    
    public String updateProgramObjective(List<UpdateProgramObjectiveDTO> dtos) {
        for (UpdateProgramObjectiveDTO dto : dtos) {
            Optional<ProgramObjectiveEntity> entityOptional = programObjectiveRepository.findById(dto.getId());
            if (entityOptional.isPresent()) {
                ProgramObjectiveEntity entity = entityOptional.get();
                programObjectiveConverter.updateEntityFromDTO(entity, dto);
                programObjectiveRepository.save(entity);
            } else {
                return "Program objective with ID " + dto.getId() + " not found";
            }
        }
        return null;
    }
}
