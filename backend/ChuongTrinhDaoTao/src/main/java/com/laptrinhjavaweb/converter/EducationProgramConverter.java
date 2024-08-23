package com.laptrinhjavaweb.converter;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.EducationProgramDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.response.CreditsResponse;
import com.laptrinhjavaweb.response.EducationProgramResponse;
import com.laptrinhjavaweb.response.ItemListResponse;
import com.laptrinhjavaweb.response.SectionAHeaderResponse;
import com.laptrinhjavaweb.response.TrainingProgramResponse;

@Component
public class EducationProgramConverter {
	public EducationProgramDTO toDTO(EducationProgramEntity trainingProgramEntity) {
        EducationProgramDTO dto = new EducationProgramDTO();
        dto.setProgramId(trainingProgramEntity.getProgramId());
        dto.setProgramCode(trainingProgramEntity.getProgramCode());
        dto.setVersion(trainingProgramEntity.getVersion());
        dto.setVietnameseName(trainingProgramEntity.getVietnameseName());
        dto.setEnglishName(trainingProgramEntity.getEnglishName());
        dto.setEducationLevel(trainingProgramEntity.getEducationLevel());
        dto.setFieldCode(trainingProgramEntity.getFieldCode());
        dto.setFieldName(trainingProgramEntity.getFieldName());
        dto.setAdmissionTarget(trainingProgramEntity.getAdmissionTarget());
        dto.setDuration(trainingProgramEntity.getDuration());
        dto.setTrainingMode(trainingProgramEntity.getTrainingMode());
        dto.setRequiredCredits(trainingProgramEntity.getRequiredCredits());
        dto.setGraduationConditions(trainingProgramEntity.getGraduationConditions());
        dto.setDiploma(trainingProgramEntity.getDiploma());
        dto.setEmploymentPositionAfterGraduation(trainingProgramEntity.getEmploymentPositionAfterGraduation());
        dto.setAdvancedSkillsDevelopment(trainingProgramEntity.getAdvancedSkillsDevelopment());
        dto.setReferenceProgram(trainingProgramEntity.getReferenceProgram());
        dto.setOverallObjectives(trainingProgramEntity.getOverallObjectives());
        dto.setResponsiblePerson(trainingProgramEntity.getResponsiblePerson());
        dto.setCurrentStep(trainingProgramEntity.getCurrentStep());
        dto.setStatus(trainingProgramEntity.getStatus());
        dto.setGeneralModule(trainingProgramEntity.getGeneralModule());
        dto.setFoundationModule(trainingProgramEntity.getFoundationModule());
        dto.setMajorFieldModule(trainingProgramEntity.getMajorFieldModule());
        dto.setSupportModule(trainingProgramEntity.getSupportModule());
        dto.setInternshipModule(trainingProgramEntity.getInternshipModule());
        dto.setThesisModule(trainingProgramEntity.getThesisModule());
        dto.setSpecializationModule(trainingProgramEntity.getSpecializationModule());
        dto.setCreatedAt(trainingProgramEntity.getCreatedAt());
        dto.setUpdatedAt(trainingProgramEntity.getUpdatedAt());
        dto.setDepartment(trainingProgramEntity.getDepartment());
        return dto;
    }
	public EducationProgramEntity toEntity(EducationProgramDTO dto) {
        EducationProgramEntity entity = new EducationProgramEntity();
        entity.setProgramId(dto.getProgramId());
        entity.setProgramCode(dto.getProgramCode());
        entity.setVersion(dto.getVersion());
        entity.setVietnameseName(dto.getVietnameseName());
        entity.setEnglishName(dto.getEnglishName());
        entity.setEducationLevel(dto.getEducationLevel());
        entity.setFieldCode(dto.getFieldCode());
        entity.setFieldName(dto.getFieldName());
        entity.setAdmissionTarget(dto.getAdmissionTarget());
        entity.setDuration(dto.getDuration());
        entity.setTrainingMode(dto.getTrainingMode());
        entity.setRequiredCredits(dto.getRequiredCredits());
        entity.setGraduationConditions(dto.getGraduationConditions());
        entity.setDiploma(dto.getDiploma());
        entity.setEmploymentPositionAfterGraduation(dto.getEmploymentPositionAfterGraduation());
        entity.setAdvancedSkillsDevelopment(dto.getAdvancedSkillsDevelopment());
        entity.setReferenceProgram(dto.getReferenceProgram());
        entity.setOverallObjectives(dto.getOverallObjectives());
        entity.setResponsiblePerson(dto.getResponsiblePerson());
        entity.setCurrentStep(dto.getCurrentStep());
        entity.setStatus(dto.getStatus());
        entity.setGeneralModule(dto.getGeneralModule());
        entity.setFoundationModule(dto.getFoundationModule());
        entity.setMajorFieldModule(dto.getMajorFieldModule());
        entity.setSupportModule(dto.getSupportModule());
        entity.setInternshipModule(dto.getInternshipModule());
        entity.setThesisModule(dto.getThesisModule());
        entity.setSpecializationModule(dto.getSpecializationModule());
        entity.setDepartment(dto.getDepartment());
        return entity;
    }
	
	public TrainingProgramResponse toOutput(EducationProgramDTO ctdtDTO) {
	    TrainingProgramResponse output = new TrainingProgramResponse();
	    output.setProgramId(ctdtDTO.getProgramId());
	    output.setVietnameseName(ctdtDTO.getVietnameseName());
	    output.setEnglishName(ctdtDTO.getEnglishName());
	    output.setEducationLevel(ctdtDTO.getEducationLevel());
	    output.setFieldCode(ctdtDTO.getFieldCode());
	    output.setFieldName(ctdtDTO.getFieldName());
	    output.setDepartment(ctdtDTO.getDepartment());
	    output.setAdmissionTarget(ctdtDTO.getAdmissionTarget());
	    output.setDuration(ctdtDTO.getDuration());
	    output.setTrainingMode(ctdtDTO.getTrainingMode());
	    output.setRequiredCredits(ctdtDTO.getRequiredCredits());
	    output.setGraduationRequirements(ctdtDTO.getGraduationConditions());
	    output.setDiploma(ctdtDTO.getDiploma());
	    output.setEmploymentPositionAfterGraduation(ctdtDTO.getEmploymentPositionAfterGraduation());
	    output.setAdvancedSkillsDevelopment(ctdtDTO.getAdvancedSkillsDevelopment());
	    output.setReferenceProgram(ctdtDTO.getReferenceProgram());
	    output.setOverallObjectives(ctdtDTO.getOverallObjectives());
	    output.setResponsiblePerson(ctdtDTO.getResponsiblePerson());
	    output.setStatus(ctdtDTO.getStatus());
	    return output;
	}

	public SectionAHeaderResponse toOutputSectionAHeader(EducationProgramDTO ctdtDTO) {
	    SectionAHeaderResponse output = new SectionAHeaderResponse();
	    output.setProgramCode(ctdtDTO.getProgramCode());
	    output.setFieldName(ctdtDTO.getFieldName());
	    output.setVersion(ctdtDTO.getVersion());
	    return output;
	}

	public CreditsResponse toOutputCredits(EducationProgramDTO ctdtDTO) {
	    CreditsResponse output = new CreditsResponse();
	    output.setGeneralModule(ctdtDTO.getGeneralModule());
	    output.setFoundationModule(ctdtDTO.getFoundationModule());
	    output.setMajorFieldModule(ctdtDTO.getMajorFieldModule());
	    output.setSupportModule(ctdtDTO.getSupportModule());
	    output.setInternshipModule(ctdtDTO.getInternshipModule());
	    output.setThesisModule(ctdtDTO.getThesisModule());
	    output.setSpecializationModule(ctdtDTO.getSpecializationModule());
	    return output;
	}

	public ItemListResponse toOutputItemList(EducationProgramDTO ctdtDTO) {
	    ItemListResponse output = new ItemListResponse();
	    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	    output.setProgramCode(ctdtDTO.getProgramCode()); 
	    output.setVietnameseName(ctdtDTO.getVietnameseName());
	    output.setFieldName(ctdtDTO.getFieldName()); 
	    output.setStatus(ctdtDTO.getStatus()); 
	    output.setProgramId(ctdtDTO.getProgramId());
	    output.setResponsiblePerson(ctdtDTO.getResponsiblePerson()); 
	    output.setCreatedAt(sdf.format(ctdtDTO.getCreatedAt())); 
	    output.setUpdatedAt(sdf.format(ctdtDTO.getUpdatedAt()));
	    return output;
	}

	public EducationProgramResponse convertToDTO(EducationProgramEntity entity) {
        EducationProgramResponse dto = new EducationProgramResponse();
        dto.setProgramCode(entity.getProgramCode());
        dto.setProgramName(entity.getVietnameseName());
        dto.setFieldName(entity.getFieldName());
        dto.setStatus(entity.getStatus().toString()); // Chuyển đổi sang chuỗi
        dto.setProgramId(entity.getProgramId().toString());
        dto.setResponsiblePerson(entity.getLecturer().getLastName() +" "+ entity.getLecturer().getFirstName());
        dto.setResponsiblePersonCode(entity.getLecturer().getLecturersCode().toString());
        dto.setDepartment(entity.getDepartment().getDepartmentName());
        
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        dto.setCreatedAt(dateFormat.format(entity.getCreatedAt()));
        dto.setUpdatedAt(dateFormat.format(entity.getUpdatedAt()));

        return dto;
    }
}
