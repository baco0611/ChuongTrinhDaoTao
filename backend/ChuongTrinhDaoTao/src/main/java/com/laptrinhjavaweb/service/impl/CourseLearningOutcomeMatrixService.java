package com.laptrinhjavaweb.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.CourseLearningOutcomeMatrixConverter;
import com.laptrinhjavaweb.dto.CourseLearningOutcomeMatrixDTO;
import com.laptrinhjavaweb.dto.CourseMatrixRequestDTO;
import com.laptrinhjavaweb.entity.CourseLearningOutcomeMatrixEntity;
import com.laptrinhjavaweb.entity.DetailedProgramEntity;
import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;
import com.laptrinhjavaweb.repository.CourseLearningOutcomeMatrixRepository;
import com.laptrinhjavaweb.repository.DetailedProgramRepository;
import com.laptrinhjavaweb.repository.ProgramLearningOutComesRepository;

import jakarta.transaction.Transactional;

@Service
public class CourseLearningOutcomeMatrixService {

    @Autowired
    private CourseLearningOutcomeMatrixRepository courseLearningOutcomeMatrixRepository;
    
    @Autowired
    private ProgramLearningOutComesRepository programLearningOutComesRepository;
    
    @Autowired
    private DetailedProgramRepository  detailedProgramRepository;
    
    public List<CourseLearningOutcomeMatrixDTO> getCourseLearningOutcomeMatrixByProgramId(Long programId) {
        return courseLearningOutcomeMatrixRepository.findByEducationProgram_ProgramId(programId)
                .stream()
                .map(CourseLearningOutcomeMatrixConverter::toDTO)
                .collect(Collectors.toList());
    }
    
    @Transactional
    public List<CourseLearningOutcomeMatrixDTO> processCourseMatrix(CourseMatrixRequestDTO request) {
        // Xử lý xóa
        if (request.getDeleteElement() != null && !request.getDeleteElement().isEmpty()) {
        	courseLearningOutcomeMatrixRepository.deleteAllById(request.getDeleteElement());
        }

        // Xử lý tạo mới
        if (request.getCreateElement() != null) {
            for (CourseMatrixRequestDTO.CreateElementDTO element : request.getCreateElement()) {
                CourseLearningOutcomeMatrixEntity entity = new CourseLearningOutcomeMatrixEntity();
                DetailedProgramEntity detailedProgram = detailedProgramRepository.findById(element.getCourseId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid Detailed Program ID: " + element.getCourseId()));
                ProgramLearningOutComesEntity learningOutcome = programLearningOutComesRepository.findById(element.getPloId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid Learning Outcome ID: " + element.getPloId()));

                entity.setDetailedProgram(detailedProgram);
                entity.setLearningOutcome(learningOutcome);
                entity.setComplianceLevel(element.getCompetency());

                courseLearningOutcomeMatrixRepository.save(entity);
            }
        }

        // Xử lý cập nhật
        if (request.getUpdateElement() != null) {
            for (CourseMatrixRequestDTO.UpdateElementDTO element : request.getUpdateElement()) {
                CourseLearningOutcomeMatrixEntity entity = courseLearningOutcomeMatrixRepository.findById(element.getId()).orElseThrow(() -> new IllegalArgumentException("Invalid ID"));
                entity.setComplianceLevel(element.getCompetency());
                courseLearningOutcomeMatrixRepository.save(entity);
            }
        }

        // Trả về toàn bộ dữ liệu (giống như getAll)
        return courseLearningOutcomeMatrixRepository.findAll() .stream()
                .map(CourseLearningOutcomeMatrixConverter::toDTO)
                .collect(Collectors.toList());
    }

    }
