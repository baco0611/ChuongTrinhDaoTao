package com.laptrinhjavaweb.converter;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.SpecializationDTO;
import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;
@Component
public class SpecializationConverter {
    public SpecializationDTO toDTO(SpecializationTrainingEntity entity) {
        if (entity == null) {
            return null;
        }

        SpecializationDTO dto = new SpecializationDTO();
        dto.setSpecializationId(entity.getSpecializationId());
        dto.setSpecializationName(entity.getSpecializationName());

        return dto;
    }
}