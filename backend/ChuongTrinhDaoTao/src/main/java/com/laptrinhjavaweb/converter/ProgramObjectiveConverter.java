package com.laptrinhjavaweb.converter;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.ProgramObjectiveDTO;
import com.laptrinhjavaweb.dto.UpdateProgramObjectiveDTO;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.entity.ProgramObjectiveEntity;

@Component
public class ProgramObjectiveConverter {
	public static ProgramObjectiveDTO convertToDTO(ProgramObjectiveEntity entity) {
		if (entity == null) {
			return null;
		}

		ProgramObjectiveDTO dto = new ProgramObjectiveDTO();
		dto.setId(entity.getObjectiveId());
		dto.setSymbol(entity.getSymbol());
		dto.setContent(entity.getContent());
		dto.setType(entity.getObjectiveType());
		dto.setProgramId(entity.getEducationProgram() != null ? entity.getEducationProgram().getProgramId() : null);
		return dto;
	}
	
	public ProgramObjectiveEntity updateEntityFromDTO(ProgramObjectiveEntity entity,
			UpdateProgramObjectiveDTO dto) {
		entity.setSymbol(dto.getSymbol());
		entity.setObjectiveType(dto.getType());
		return entity;
	}
}
