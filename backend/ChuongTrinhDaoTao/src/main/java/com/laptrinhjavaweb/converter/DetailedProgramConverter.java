package com.laptrinhjavaweb.converter;

import java.util.ArrayList;
import java.util.Arrays;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.entity.DetailedProgramEntity;

@Component
public class DetailedProgramConverter {
	public DetailedProgramDTO convertToDTO(DetailedProgramEntity entity, int index) { // Nhận thêm chỉ số index
	    DetailedProgramDTO dto = new DetailedProgramDTO();

	    // Set các giá trị đơn giản
	    dto.setId(entity.getDetailedProgramId());
	    dto.setIdCourseOutline(entity.getCourseOutline().getIdCourseOutline());
	    dto.setMandatory(entity.getMandatory());
	    dto.setReplacesThesis(entity.getReplacesThesis());
	    dto.setCourseCode(entity.getCourseOutline().getCourse().getCourseCode());
	    dto.setCourseName(entity.getCourseOutline().getCourse().getCourseName());
	    dto.setCreditNumber(entity.getCourseOutline().getCourse().getCreditNumbers());
	    dto.setTheoryHours(entity.getCourseOutline().getTheoryHours());
	    dto.setExerciseHours(entity.getCourseOutline().getExerciseHours());
	    dto.setDiscussionHours(entity.getCourseOutline().getDiscussionHours());
	    dto.setPracticalHours(entity.getCourseOutline().getPracticalHours());
	    dto.setInternshipHours(entity.getCourseOutline().getInternshipHours());
	    dto.setTestHours(entity.getCourseOutline().getTestHours());
	    dto.setSemesterHours(entity.getSemester());

	    // Cài đặt chỉ số index
	    dto.setIndex(index); // Giả sử bạn đã thêm phương thức setIndex trong DTO

	    // Chuyển đổi các danh sách khóa học
	    dto.setPrerequisiteCourse(entity.getPrerequisiteCourse() != null ? entity.getPrerequisiteCourse() : new ArrayList<>());
	    dto.setPriorCourse(entity.getPriorCourse() != null ? entity.getPriorCourse() : new ArrayList<>());
	    dto.setConcurrentCourse(entity.getConcurrentCourse() != null ? entity.getConcurrentCourse() : new ArrayList<>());

	    // Điều kiện knowledge_module và detailed_knowledge_module
	    if ("GENERAL".equals(entity.getKnowledgeModule())) {
	        dto.setKnowledgeModule("GENERAL");
	        dto.setDetailedKnowledgeModule(null);
	        dto.setSpecializationId(null);
	        dto.setSpecializationName(null);
	    } else if ("PROFESSIONAL".equals(entity.getKnowledgeModule())) {
	        dto.setKnowledgeModule("PROFESSIONAL");
	        dto.setDetailedKnowledgeModule(getDetailedKnowledgeModule(entity.getDetailedKnowledgeModule()));
	        if ("SPECIALIZE".equals(entity.getDetailedKnowledgeModule())) {
	            dto.setSpecializationId(entity.getSpecializationTraining() != null
	                    ? entity.getSpecializationTraining().getSpecializationId()
	                    : null);
	            dto.setSpecializationName(entity.getSpecializationTraining() != null
	                    ? entity.getSpecializationTraining().getSpecializationName()
	                    : null);
	            dto.setReplacesThesis(false);
	        } else if ("THESIS_PROJECT".equals(entity.getDetailedKnowledgeModule())) {
	            dto.setSpecializationId(entity.getSpecializationTraining() != null
	                    ? entity.getSpecializationTraining().getSpecializationId()
	                    : null);
	            dto.setSpecializationName(entity.getSpecializationTraining() != null
	                    ? entity.getSpecializationTraining().getSpecializationName()
	                    : null);
	            dto.setReplacesThesis(true);
	        }
	    }

	    return dto;
	}

	private String getDetailedKnowledgeModule(String module) {
		switch (module) {
		case "BASIC":
			return "BASIC";
		case "MAJOR":
			return "MAJOR";
		case "INTERN":
			return "INTERN";
		case "SUPPLEMENTARY":
			return "SUPPLEMENTARY";
		case "THESIS_PROJECT":
			return "THESIS_PROJECT";
		case "SPECIALIZE":
			return "SPECIALIZE";
		default:
			return null;
		}
	}
}
