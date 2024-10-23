package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.DetailedProgramConverter;
import com.laptrinhjavaweb.dto.CreateDetailedProgramDTO;
import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.dto.UpdateDetailedProgramDTO;
import com.laptrinhjavaweb.dto.UpdateIndexDTO;
import com.laptrinhjavaweb.entity.CourseOutlineEntity;
import com.laptrinhjavaweb.entity.DetailedProgramEntity;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;
import com.laptrinhjavaweb.repository.CourseOutlineRepository;
import com.laptrinhjavaweb.repository.DetailedProgramRepository;
import com.laptrinhjavaweb.repository.EducationProgramRepository;
import com.laptrinhjavaweb.repository.SpecializationTrainingRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class DetailedProgramService {

	@Autowired
    private DetailedProgramRepository detailedProgramRepository;

    @Autowired
    private EducationProgramRepository educationProgramRepository;

    @Autowired
    private CourseOutlineRepository courseOutlineRepository;

    @Autowired
    private SpecializationTrainingRepository specializationTrainingRepository;

    @Autowired
    private DetailedProgramConverter detailedProgramConverter;

    public List<DetailedProgramDTO> getProgramsByProgramId(Long programId) {
        List<DetailedProgramEntity> entities = detailedProgramRepository.findByEducationProgramProgramId(programId);

        return entities.stream()
                .map(entity -> detailedProgramConverter.convertToDTO(entity))
                .collect(Collectors.toList());
    }   
    
    public List<DetailedProgramDTO> createDetailedProgram(CreateDetailedProgramDTO dto) throws Exception {
        EducationProgramEntity educationProgram = educationProgramRepository.findById(dto.getProgramId())
                .orElseThrow(() -> new Exception("Program not found"));

        CourseOutlineEntity courseOutline = courseOutlineRepository.findById(dto.getCourseOutlineId())
                .orElseThrow(() -> new Exception("Course Outline not found"));

        SpecializationTrainingEntity specialization = null;
        if (dto.getSpecializationId() != null) {
            specialization = specializationTrainingRepository.findById(dto.getSpecializationId())
                    .orElseThrow(() -> new Exception("Specialization not found"));
        }

        // Logic validation
        if ("GENERAL".equals(dto.getKnowledgeModule())) {
            dto.setDetailedKnowledgeModule(null);
            dto.setSpecializationId(null);
        } else if ("PROFESSIONAL".equals(dto.getKnowledgeModule())) {
            if (dto.getDetailedKnowledgeModule() == null) {
                throw new Exception("detailedKnowledgeModule must have value for PROFESSIONAL");
            }
        }

        DetailedProgramEntity entity = detailedProgramConverter.convertToEntity(dto, courseOutline, educationProgram, specialization);
        DetailedProgramEntity savedEntity = detailedProgramRepository.save(entity);

        return getProgramsByProgramId(dto.getProgramId());
    }
    
    public List<DetailedProgramDTO> deleteDetailedProgram(Long id) {
        if (!detailedProgramRepository.existsById(id)) {
            throw new EntityNotFoundException("DetailedProgram with ID " + id + " not found");
        }
        DetailedProgramEntity entity = detailedProgramRepository.findById(id)
                .orElse(null);
        Long idProgram = entity.getEducationProgram().getProgramId();
        detailedProgramRepository.deleteById(id);
        return getProgramsByProgramId(idProgram); 
    }
    
    public List<DetailedProgramDTO> updateDetailedProgram(Long id, UpdateDetailedProgramDTO request) {
        DetailedProgramEntity entity = detailedProgramRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("DetailedProgram with ID " + id + " not found"));

        entity.setIndex(request.getIndex());
        entity.setMandatory(request.getMandatory());
        entity.setSemester(request.getSemester());
        entity.setReplacesThesis(request.getReplacesThesis());
        entity.setPrerequisiteCourse(request.getPrerequisiteCourse());
        entity.setPriorCourse(request.getPriorCourse());
        entity.setConcurrentCourse(request.getConcurrentCourse());
        detailedProgramRepository.save(entity);
        return getProgramsByProgramId(entity.getEducationProgram().getProgramId());
    }
    
    public List<DetailedProgramDTO> updateDetailedProgramIndices(List<UpdateIndexDTO> updates) {
        List<DetailedProgramDTO> updatedPrograms = new ArrayList<>();
        
        for (UpdateIndexDTO update : updates) {
            // Tìm tất cả các bản ghi tương ứng
            List<DetailedProgramEntity> entities = detailedProgramRepository
                    .findByCourseOutlineIdCourseOutlineAndEducationProgramProgramId(
                            update.getProgramId(), update.getCourseOutlineId());
            System.out.println(update.getCourseOutlineId() + "," + update.getProgramId());
            // Nếu không tìm thấy bản ghi nào, ném ngoại lệ
            if (entities.isEmpty()) {
                throw new EntityNotFoundException("No DetailedProgram found for programId: " + update.getProgramId() 
                    + " and courseOutlineId: " + update.getCourseOutlineId());
            }
            
            // Duyệt qua từng entity để cập nhật index
            for (DetailedProgramEntity entity : entities) {
                entity.setIndex(update.getIndex());
                detailedProgramRepository.save(entity);
                updatedPrograms.add(detailedProgramConverter.convertToDTO(entity));
            }
        }
        
        return updatedPrograms;
    }

}
