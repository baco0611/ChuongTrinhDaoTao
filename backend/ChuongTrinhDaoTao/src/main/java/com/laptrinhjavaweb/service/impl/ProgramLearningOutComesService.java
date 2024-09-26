package com.laptrinhjavaweb.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.ProgramLearningOutcomeConverter;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.repository.ProgramLearningOutComesRepository;
import com.laptrinhjavaweb.request.ProgramLearningOutComesUpdateRequest;
import com.laptrinhjavaweb.request.ProgramLearningOutcomeRequest;
import com.laptrinhjavaweb.request.UpdateLearningOutcomeRequest;
import com.laptrinhjavaweb.response.ProgramLearningOutComesGetResponse;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ProgramLearningOutComesService {

    @Autowired
    private ProgramLearningOutComesRepository repository;
    
    @Autowired
    private EducationProgramRepository programRepository;
    
    @Autowired
    private ProgramLearningOutcomeConverter programLearningOutcomeConverter;

    public List<ProgramLearningOutComesEntity> getLearningOutcomesByProgramId(Long programId) {
        return repository.findByEducationProgramProgramId(programId);
    }
    
//    public ProgramLearningOutComesEntity updateLearningOutcome(Long id, String content) {
//        ProgramLearningOutComesEntity entity = repository.findById(id)
//            .orElseThrow(() -> new ResourceNotFoundException("ProgramLearningOutComes not found with id: " + id));
//
//        entity.setContent(content);
//        return repository.save(entity);
//    }
    
//    public ProgramLearningOutComesEntity createLearningOutcome(CreateProgramObjectiveRequest request) {
//        EducationProgramEntity programEntity = programRepository.findById(request.getProgramId())
//                .orElseThrow(() -> new ResourceNotFoundException("Program with ID " + request.getProgramId() + " not found"));
//
//        ProgramLearningOutComesEntity newEntity = new ProgramLearningOutComesEntity();
//        newEntity.setSymbol(request.getSymbol());
//        newEntity.setContent(""); // Initialize content as empty
//        newEntity.setLearningOutcomeType(request.getType());
//        newEntity.setEducationProgram(programEntity);
//
//        return repository.save(newEntity);
//    }

//    public void deleteLearningOutcome(Long id) {
//        if (repository.existsById(id)) {
//            repository.deleteById(id);
//        } else {
//            throw new ResourceNotFoundException("ProgramLearningOutComes not found with id: " + id);
//        }
//    }
    
//    public List<ProgramLearningOutComesDTO> getAllLearningOutcomes() {
//        List<ProgramLearningOutComesEntity> entities = repository.findAll();
//        return entities.stream()
//                .map(ProgramLearningOutcomeConverter::convertToDTO1)
//                .collect(Collectors.toList());
//    }
    
//    public String updateProgramLearningOutcomes(List<UpdateProgramLearningOutcomeDTO> dtos) {
//        for (UpdateProgramLearningOutcomeDTO dto : dtos) {
//            Optional<ProgramLearningOutComesEntity> entityOptional = repository.findById(dto.getId());
//            if (entityOptional.isPresent()) {
//                ProgramLearningOutComesEntity entity = entityOptional.get();
//                programLearningOutcomeConverter.updateEntityFromDTO(entity, dto);
//                repository.save(entity);
//            } else {
//                return "Learning Outcome with ID " + dto.getId() + " not found";
//            }
//        }
//        return null;
//    }
//    
    public List<ProgramLearningOutComesGetResponse> getAllLearningOutcomesByProgramId(Long programId) {
        List<ProgramLearningOutComesEntity> entities = repository.findByEducationProgramProgramId(programId);
        return ProgramLearningOutcomeConverter.toDTOList(entities);
    }
    
    public String updateLearningOutcome(ProgramLearningOutComesUpdateRequest request) {
        ProgramLearningOutComesEntity entity = repository.findById(request.getId())
                .orElse(null);

        if (entity == null) {
            return "PLO không tồn tại";
        }

        // Cập nhật thông tin từ request
        entity.setContent(request.getContent());
        entity.setCompetencyLevel(request.getCompetency());

        // Lưu lại thay đổi
        repository.save(entity);

        return null; // Không có lỗi
    }
    
    public ProgramLearningOutComesEntity createProgramLearningOutcome(ProgramLearningOutcomeRequest request) {
        ProgramLearningOutComesEntity newPLO = new ProgramLearningOutComesEntity();
        
        // Tìm program theo id
        EducationProgramEntity program = programRepository.findById(request.getProgramId())
            .orElseThrow(() -> new RuntimeException("Program not found"));
        
        // Thiết lập các giá trị cho PLO
        newPLO.setEducationProgram(program);
        newPLO.setSymbol(request.getSymbol());
        newPLO.setLearningOutcomeType(request.getType());
        newPLO.setDetailedlearningOutcomeType(request.getTypeDetail());
        newPLO.setContent("");  // content trống
        newPLO.setCompetencyLevel(0); // competency trống (hoặc có thể set là null)
        
        // Lưu PLO mới
        repository.save(newPLO);
        
        return newPLO;
    }
    
    public ProgramLearningOutComesEntity getLearningOutcomeById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new EntityNotFoundException("ProgramLearningOutcome not found"));
    }
    
    public void updateLearningOutcomes(List<UpdateLearningOutcomeRequest> updates) {
        for (UpdateLearningOutcomeRequest update : updates) {
            ProgramLearningOutComesEntity entity = repository.findById(update.getId())
                .orElseThrow(() -> new EntityNotFoundException("ProgramLearningOutcome not found with id " + update.getId()));
            entity.setLearningOutcomeType(update.getType());
            entity.setDetailedlearningOutcomeType(update.getTypeDetail());
            entity.setSymbol(update.getSymbol());
            repository.save(entity);
        }
    }
    
    public void deleteProgramLearningOutcome(Long id) {
        repository.deleteById(id);
    }
}
