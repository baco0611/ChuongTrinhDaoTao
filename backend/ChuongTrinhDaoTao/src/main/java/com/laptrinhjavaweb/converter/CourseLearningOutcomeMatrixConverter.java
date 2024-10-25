package com.laptrinhjavaweb.converter;

import com.laptrinhjavaweb.dto.CourseLearningOutcomeMatrixDTO;
import com.laptrinhjavaweb.entity.CourseLearningOutcomeMatrixEntity;

public class CourseLearningOutcomeMatrixConverter {
	public static CourseLearningOutcomeMatrixDTO toDTO(CourseLearningOutcomeMatrixEntity entity) {
        if (entity == null) {
            return null;
        }

        CourseLearningOutcomeMatrixDTO dto = new CourseLearningOutcomeMatrixDTO();
        dto.setId(entity.getMatrixId());
        dto.setPloId(entity.getLearningOutcome().getLearningOutcomeId());
        dto.setCourseId(entity.getDetailedProgram().getDetailedProgramId());
        dto.setCompetency(entity.getComplianceLevel());

        return dto;
    }
}
