package com.laptrinhjavaweb.converter;

import java.util.ArrayList;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.CreateDetailedProgramDTO;
import com.laptrinhjavaweb.dto.DetailedProgramDTO;
import com.laptrinhjavaweb.dto.UpdateDetailedProgramDTO;
import com.laptrinhjavaweb.entity.CourseOutlineEntity;
import com.laptrinhjavaweb.entity.DetailedProgramEntity;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;

@Component
public class DetailedProgramConverter {
	public DetailedProgramDTO convertToDTO(DetailedProgramEntity entity) {
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
		dto.setIndex(entity.getIndex());
		dto.setPrerequisiteCourse(
				entity.getPrerequisiteCourse() != null ? entity.getPrerequisiteCourse() : new ArrayList<>());
		dto.setPriorCourse(entity.getPriorCourse() != null ? entity.getPriorCourse() : new ArrayList<>());
		dto.setConcurrentCourse(
				entity.getConcurrentCourse() != null ? entity.getConcurrentCourse() : new ArrayList<>());
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

	public DetailedProgramEntity convertToEntity(CreateDetailedProgramDTO dto, CourseOutlineEntity courseOutline,
			EducationProgramEntity educationProgram, SpecializationTrainingEntity specialization) {
		DetailedProgramEntity entity = new DetailedProgramEntity();
		entity.setIndex(dto.getIndex());
		entity.setMandatory(dto.getMandatory());
		entity.setPrerequisiteCourse(dto.getPrerequisiteCourse());
		entity.setPriorCourse(dto.getPriorCourse());
		entity.setConcurrentCourse(dto.getConcurrentCourse());
		entity.setKnowledgeModule(dto.getKnowledgeModule());
		entity.setDetailedKnowledgeModule(dto.getDetailedKnowledgeModule());
		entity.setReplacesThesis(dto.getReplacesThesis());
		entity.setSemester(dto.getSemester());
		entity.setCourseOutline(courseOutline);
		entity.setEducationProgram(educationProgram);
		entity.setSpecializationTraining(specialization);
		return entity;
	}

	public UpdateDetailedProgramDTO convertToDTOForUpdate(DetailedProgramEntity entity) {
		UpdateDetailedProgramDTO dto = new UpdateDetailedProgramDTO();
		dto.setIndex(entity.getIndex());
		dto.setMandatory(entity.getMandatory());
		dto.setReplacesThesis(entity.getReplacesThesis());
		dto.setSemester(entity.getSemester());
		dto.setPrerequisiteCourse(entity.getPrerequisiteCourse());
		dto.setPriorCourse(entity.getPriorCourse());
		dto.setConcurrentCourse(entity.getConcurrentCourse());
		return dto;
	}
	
	public CreateDetailedProgramDTO convertToGetDetailedProgramDTO(DetailedProgramEntity entity) {
	    CreateDetailedProgramDTO dto = new CreateDetailedProgramDTO();
	    dto.setProgramId(entity.getEducationProgram().getProgramId());
	    dto.setCourseOutlineId(entity.getCourseOutline() != null ? entity.getCourseOutline().getIdCourseOutline() : null);
	    dto.setIndex(entity.getIndex());
	    dto.setMandatory(entity.getMandatory());
	    dto.setPrerequisiteCourse(entity.getPrerequisiteCourse());
	    dto.setPriorCourse(entity.getPriorCourse());
	    dto.setConcurrentCourse(entity.getConcurrentCourse());
	    dto.setKnowledgeModule(entity.getKnowledgeModule());
	    dto.setDetailedKnowledgeModule(entity.getDetailedKnowledgeModule());
	    dto.setSpecializationId(entity.getSpecializationTraining() != null ? entity.getSpecializationTraining().getSpecializationId() : null);
	    dto.setReplacesThesis(entity.getReplacesThesis());
	    dto.setSemester(entity.getSemester());
	    return dto;
	}
}
