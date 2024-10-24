package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.dto.CreateElementDTO;
import com.laptrinhjavaweb.dto.LearningOutComesObjectiveMatrixDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.LearningOutComesObjectiveMatrixEntity;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.entity.ProgramObjectiveEntity;
import com.laptrinhjavaweb.repository.LearningOutComesObjectiveMatrixRepository;
import com.laptrinhjavaweb.request.UpdateMatrixRequestDTO;

@Service
public class LearningOutComesObjectiveMatrixService {

    @Autowired
    private LearningOutComesObjectiveMatrixRepository repository;

    public List<LearningOutComesObjectiveMatrixDTO> getAllMatrices(Long programId) {
    	 List<LearningOutComesObjectiveMatrixEntity> entities = repository.findByEducationProgramProgramId(programId);
    	    return entities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }

    private LearningOutComesObjectiveMatrixDTO convertToDTO(LearningOutComesObjectiveMatrixEntity entity) {
        return new LearningOutComesObjectiveMatrixDTO(
                entity.getMatrixId(),
                entity.getObjective().getObjectiveId(),
                entity.getLearningOutcome().getLearningOutcomeId()
        );
    }
    
    public List<LearningOutComesObjectiveMatrixDTO> updateMatrix(UpdateMatrixRequestDTO request) {
        // Xóa các phần tử dựa trên danh sách ID trong deleteElement
        List<Long> deleteElement = request.getDeleteElement();
        if (deleteElement != null && !deleteElement.isEmpty()) {
            repository.deleteAllById(deleteElement);
        }

        // Tạo các phần tử mới trong createElement
        List<CreateElementDTO> createElement = request.getCreateElement();
        if (createElement != null && !createElement.isEmpty()) {
            for (CreateElementDTO dto : createElement) {
                LearningOutComesObjectiveMatrixEntity matrixEntity = new LearningOutComesObjectiveMatrixEntity();

                ProgramObjectiveEntity programObjective = new ProgramObjectiveEntity();
                programObjective.setObjectiveId(dto.getPoId());

                ProgramLearningOutComesEntity programLearningOutcome = new ProgramLearningOutComesEntity();
                programLearningOutcome.setLearningOutcomeId(dto.getPloId());
                
                EducationProgramEntity educationProgramEntity = new EducationProgramEntity();
                educationProgramEntity.setProgramId(request.getProgramId());

                matrixEntity.setObjective(programObjective);
                matrixEntity.setLearningOutcome(programLearningOutcome);
                matrixEntity.setEducationProgram(educationProgramEntity);

                repository.save(matrixEntity);
            }
        }

        // Lấy tất cả các phần tử sau khi cập nhật
        List<LearningOutComesObjectiveMatrixEntity> updatedEntities = repository.findAll();

        // Chuyển đổi thành DTO để trả về response
        return updatedEntities.stream().map(this::convertToDTO).collect(Collectors.toList());
    }
}
