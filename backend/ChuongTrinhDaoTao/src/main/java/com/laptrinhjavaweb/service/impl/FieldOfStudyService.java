package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.FieldOfStudyConverter;
import com.laptrinhjavaweb.dto.FieldOfStudyDTO;
import com.laptrinhjavaweb.entity.FieldOfStudyEntity;
import com.laptrinhjavaweb.repository.FieldOfStudyRepository;

@Service
public class FieldOfStudyService {

    @Autowired
    private FieldOfStudyRepository fieldOfStudyRepository;
    
    @Autowired
    private FieldOfStudyConverter fieldOfStudyConverter;

    public List<FieldOfStudyDTO> getAllFieldsOfStudy() {
        List<FieldOfStudyEntity> entities = fieldOfStudyRepository.findAll();
        return entities.stream().map(fieldOfStudyConverter::convertToDTO).collect(Collectors.toList());
    }

    
}
