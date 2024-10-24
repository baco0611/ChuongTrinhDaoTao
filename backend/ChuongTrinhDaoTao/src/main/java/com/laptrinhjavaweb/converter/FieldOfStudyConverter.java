package com.laptrinhjavaweb.converter;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.FieldOfStudyDTO;
import com.laptrinhjavaweb.entity.FieldOfStudyEntity;

@Component
public class FieldOfStudyConverter {
	public FieldOfStudyDTO convertToDTO(FieldOfStudyEntity entity) {
        FieldOfStudyDTO dto = new FieldOfStudyDTO();
        dto.setId(entity.getId());
        dto.setFieldCode(entity.getFieldCode());
        dto.setFieldName(entity.getFieldName());
        dto.setDepartment(entity.getDepartment() != null ? entity.getDepartment().getDepartmentCode() : null);
        return dto;
    }
}
