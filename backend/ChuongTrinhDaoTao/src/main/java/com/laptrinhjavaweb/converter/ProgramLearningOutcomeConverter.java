package com.laptrinhjavaweb.converter;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.ProgramLearningOutComesDTO;
import com.laptrinhjavaweb.dto.ProgramLearningOutcomeDTO;
import com.laptrinhjavaweb.dto.UpdateProgramLearningOutcomeDTO;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.response.ProgramLearningOutComesGetResponse;

@Component
public class ProgramLearningOutcomeConverter {
	public static ProgramLearningOutcomeDTO convertToDTO(ProgramLearningOutComesEntity entity) {
		if (entity == null) {
			return null;
		}

		ProgramLearningOutcomeDTO dto = new ProgramLearningOutcomeDTO();
		dto.setId(entity.getLearningOutcomeId());
		dto.setSymbol(entity.getSymbol());
		dto.setContent(entity.getContent());
		dto.setType(entity.getLearningOutcomeType());
		dto.setProgramId(entity.getEducationProgram() != null ? entity.getEducationProgram().getProgramId() : null);
		return dto;
	}

	public static ProgramLearningOutComesDTO convertToDTO1(ProgramLearningOutComesEntity entity) {
		if (entity == null) {
			return null;
		}

		ProgramLearningOutComesDTO dto = new ProgramLearningOutComesDTO();
		dto.setId(entity.getLearningOutcomeId());
		dto.setSymbol(entity.getSymbol());
		dto.setContent(entity.getContent());
		dto.setType(entity.getLearningOutcomeType());
		dto.setProgramId(entity.getEducationProgram().getProgramId());

		return dto;
	}

	public ProgramLearningOutComesEntity updateEntityFromDTO(ProgramLearningOutComesEntity entity,
			UpdateProgramLearningOutcomeDTO dto) {
		entity.setSymbol(dto.getSymbol());
		entity.setLearningOutcomeType(dto.getType());
		return entity;
	}
	
	public static ProgramLearningOutComesGetResponse toResponse(ProgramLearningOutComesEntity entity) {
        if (entity == null) {
            return null;
        }
        ProgramLearningOutComesGetResponse dto = new ProgramLearningOutComesGetResponse();
        dto.setId(entity.getLearningOutcomeId());
        dto.setSymbol(entity.getSymbol());
        dto.setContent(entity.getContent());
        dto.setType(entity.getLearningOutcomeType());
        dto.setType(entity.getDetailedlearningOutcomeType());
        dto.setCompetency(entity.getCompetencyLevel());
        dto.setProgramId(entity.getEducationProgram() != null ? entity.getEducationProgram().getProgramId() : null);
        return dto;
    }

    public static List<ProgramLearningOutComesGetResponse> toDTOList(List<ProgramLearningOutComesEntity> entities) {
        return entities.stream().map(ProgramLearningOutcomeConverter::toResponse).collect(Collectors.toList());
    }
}
