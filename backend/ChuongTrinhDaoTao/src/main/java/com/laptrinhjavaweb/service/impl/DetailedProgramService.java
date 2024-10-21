package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.DetailedProgramConverter;
import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.entity.DetailedProgramEntity;
import com.laptrinhjavaweb.repository.DetailedProgramRepository;

@Service
public class DetailedProgramService {

    @Autowired
    private DetailedProgramRepository detailedProgramRepository;
    
    @Autowired 
    private DetailedProgramConverter detailedProgramConverter;

    public List<DetailedProgramDTO> getProgramsByProgramId(Long programId) {
        List<DetailedProgramEntity> entities = detailedProgramRepository.findByEducationProgramProgramId(programId);

        // Duyệt qua danh sách và thêm chỉ số index
        return entities.stream()
                .map(entity -> detailedProgramConverter.convertToDTO(entity, entities.indexOf(entity) + 1)) // Chỉ số bắt đầu từ 1
                .collect(Collectors.toList());    
    }    
}
