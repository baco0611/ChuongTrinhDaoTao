package com.laptrinhjavaweb.converter;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.DepartmentDTO;
import com.laptrinhjavaweb.entity.DepartmentEntity;

@Component
public class DepartmentConverter {
	public DepartmentDTO toDTO(DepartmentEntity entity) {
        return DepartmentDTO.builder()
                .departmentId(entity.getDepartmentCode())
                .departmentName(entity.getDepartmentName())
                .build();
    }

//    public DepartmentEntity toEntity(DepartmentDTO dto) {
//        DepartmentEntity entity = new DepartmentEntity();
//        entity.setDepartmentCode(dto.getDepartmentId());
//        entity.setDepartmentName(dto.getDepartmentName());
//        entity.setLecturer(dto.getLecturer());
//        return entity;
//    }
}
