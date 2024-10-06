package com.laptrinhjavaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.response.ProgramLearningOutComesGetResponse;

@Component
public class ProgramLearningOutcomeConverter {
	
	public static ProgramLearningOutComesGetResponse toResponse(ProgramLearningOutComesEntity entity) {
        if (entity == null) {
            return null;
        }
        ProgramLearningOutComesGetResponse dto = new ProgramLearningOutComesGetResponse();
        dto.setId(entity.getLearningOutcomeId());
        dto.setSymbol(entity.getSymbol());
        dto.setContent(entity.getContent());
        dto.setType(entity.getLearningOutcomeType());
        dto.setTypeDetail(entity.getDetailedlearningOutcomeType());
        dto.setCompetency(entity.getCompetencyLevel());
        dto.setProgramId(entity.getEducationProgram() != null ? entity.getEducationProgram().getProgramId() : null);
        return dto;
    }

    public static List<ProgramLearningOutComesGetResponse> toDTOList(List<ProgramLearningOutComesEntity> entities) {
        return entities.stream().map(ProgramLearningOutcomeConverter::toResponse).collect(Collectors.toList());
    }
}
