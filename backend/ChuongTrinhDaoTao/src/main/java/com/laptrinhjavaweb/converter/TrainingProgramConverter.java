package com.laptrinhjavaweb.converter;

import java.text.SimpleDateFormat;

import org.springframework.stereotype.Component;

import com.laptrinhjavaweb.dto.TrainingProgramDTO;
import com.laptrinhjavaweb.entity.TrainingProgramEntity;
import com.laptrinhjavaweb.response.CreditsResponse;
import com.laptrinhjavaweb.response.ItemListResponse;
import com.laptrinhjavaweb.response.SectionAHeaderResponse;
import com.laptrinhjavaweb.response.TrainingProgramResponse;

@Component
public class TrainingProgramConverter {
	public TrainingProgramDTO toDTO(TrainingProgramEntity trainingProgramEntity) {
        TrainingProgramDTO dto = new TrainingProgramDTO();
        dto.setSequence(trainingProgramEntity.getSequence());
        dto.setProgramId(trainingProgramEntity.getProgramId());
        dto.setProgramCode(trainingProgramEntity.getProgramCode());
        dto.setVersion(trainingProgramEntity.getVersion());
        dto.setVietnameseName(trainingProgramEntity.getVietnameseName());
        dto.setEnglishName(trainingProgramEntity.getEnglishName());
        dto.setEducationLevel(trainingProgramEntity.getEducationLevel());
        dto.setFieldCode(trainingProgramEntity.getFieldCode());
        dto.setFieldName(trainingProgramEntity.getFieldName());
        dto.setProgramManagementDepartment(trainingProgramEntity.getProgramManagementDepartment());
        dto.setAdmissionTarget(trainingProgramEntity.getAdmissionTarget());
        dto.setDuration(trainingProgramEntity.getDuration());
        dto.setTrainingMode(trainingProgramEntity.getTrainingMode());
        dto.setRequiredCredits(trainingProgramEntity.getRequiredCredits());
        dto.setGraduationRequirements(trainingProgramEntity.getGraduationRequirements());
        dto.setDiploma(trainingProgramEntity.getDiploma());
        dto.setEmploymentPositionAfterGraduation(trainingProgramEntity.getEmploymentPositionAfterGraduation());
        dto.setAdvancedSkillsDevelopment(trainingProgramEntity.getAdvancedSkillsDevelopment());
        dto.setReferenceProgram(trainingProgramEntity.getReferenceProgram());
        dto.setOverallObjectives(trainingProgramEntity.getOverallObjectives());
        dto.setResponsiblePerson(trainingProgramEntity.getResponsiblePerson());
        dto.setCurrentStep(trainingProgramEntity.getCurrentStep());
        dto.setStatus(trainingProgramEntity.getStatus());
        dto.setGeneralModule(trainingProgramEntity.getGeneralModule());
        dto.setBasicFieldModule(trainingProgramEntity.getBasicFieldModule());
        dto.setMajorFieldModule(trainingProgramEntity.getMajorFieldModule());
        dto.setSupportModule(trainingProgramEntity.getSupportModule());
        dto.setInternshipModule(trainingProgramEntity.getInternshipModule());
        dto.setThesisModule(trainingProgramEntity.getThesisModule());
        dto.setSpecializationModule(trainingProgramEntity.getSpecializationModule());
        dto.setCreatedAt(trainingProgramEntity.getCreatedAt());
        dto.setUpdatedAt(trainingProgramEntity.getUpdatedAt());
        return dto;
    }
	public TrainingProgramEntity toEntity(TrainingProgramDTO dto) {
        TrainingProgramEntity entity = new TrainingProgramEntity();
        entity.setSequence(dto.getSequence());
        entity.setProgramId(dto.getProgramId());
        entity.setProgramCode(dto.getProgramCode());
        entity.setVersion(dto.getVersion());
        entity.setVietnameseName(dto.getVietnameseName());
        entity.setEnglishName(dto.getEnglishName());
        entity.setEducationLevel(dto.getEducationLevel());
        entity.setFieldCode(dto.getFieldCode());
        entity.setFieldName(dto.getFieldName());
        entity.setProgramManagementDepartment(dto.getProgramManagementDepartment());
        entity.setAdmissionTarget(dto.getAdmissionTarget());
        entity.setDuration(dto.getDuration());
        entity.setTrainingMode(dto.getTrainingMode());
        entity.setRequiredCredits(dto.getRequiredCredits());
        entity.setGraduationRequirements(dto.getGraduationRequirements());
        entity.setDiploma(dto.getDiploma());
        entity.setEmploymentPositionAfterGraduation(dto.getEmploymentPositionAfterGraduation());
        entity.setAdvancedSkillsDevelopment(dto.getAdvancedSkillsDevelopment());
        entity.setReferenceProgram(dto.getReferenceProgram());
        entity.setOverallObjectives(dto.getOverallObjectives());
        entity.setResponsiblePerson(dto.getResponsiblePerson());
        entity.setCurrentStep(dto.getCurrentStep());
        entity.setStatus(dto.getStatus());
        entity.setGeneralModule(dto.getGeneralModule());
        entity.setBasicFieldModule(dto.getBasicFieldModule());
        entity.setMajorFieldModule(dto.getMajorFieldModule());
        entity.setSupportModule(dto.getSupportModule());
        entity.setInternshipModule(dto.getInternshipModule());
        entity.setThesisModule(dto.getThesisModule());
        entity.setSpecializationModule(dto.getSpecializationModule());
        return entity;
    }
	
	public TrainingProgramResponse toOutput(TrainingProgramDTO ctdtDTO) {
	    TrainingProgramResponse output = new TrainingProgramResponse();
	    output.setProgramId(ctdtDTO.getProgramId());
	    output.setVietnameseName(ctdtDTO.getVietnameseName());
	    output.setEnglishName(ctdtDTO.getEnglishName());
	    output.setEducationLevel(ctdtDTO.getEducationLevel());
	    output.setFieldCode(ctdtDTO.getFieldCode());
	    output.setFieldName(ctdtDTO.getFieldName());
	    output.setProgramManagementDepartment(ctdtDTO.getProgramManagementDepartment());
	    output.setAdmissionTarget(ctdtDTO.getAdmissionTarget());
	    output.setDuration(ctdtDTO.getDuration());
	    output.setTrainingMode(ctdtDTO.getTrainingMode());
	    output.setRequiredCredits(ctdtDTO.getRequiredCredits());
	    output.setGraduationRequirements(ctdtDTO.getGraduationRequirements());
	    output.setDiploma(ctdtDTO.getDiploma());
	    output.setEmploymentPositionAfterGraduation(ctdtDTO.getEmploymentPositionAfterGraduation());
	    output.setAdvancedSkillsDevelopment(ctdtDTO.getAdvancedSkillsDevelopment());
	    output.setReferenceProgram(ctdtDTO.getReferenceProgram());
	    output.setOverallObjectives(ctdtDTO.getOverallObjectives());
	    output.setResponsiblePerson(ctdtDTO.getResponsiblePerson());
	    output.setStatus(ctdtDTO.getStatus());
	    return output;
	}

	public SectionAHeaderResponse toOutputSectionAHeader(TrainingProgramDTO ctdtDTO) {
	    SectionAHeaderResponse output = new SectionAHeaderResponse();
	    output.setProgramCode(ctdtDTO.getProgramCode());
	    output.setFieldName(ctdtDTO.getFieldName());
	    output.setVersion(ctdtDTO.getVersion());
	    return output;
	}

	public CreditsResponse toOutputCredits(TrainingProgramDTO ctdtDTO) {
	    CreditsResponse output = new CreditsResponse();
	    output.setGeneralModule(ctdtDTO.getGeneralModule());
	    output.setBasicFieldModule(ctdtDTO.getBasicFieldModule());
	    output.setMajorFieldModule(ctdtDTO.getMajorFieldModule());
	    output.setSupportModule(ctdtDTO.getSupportModule());
	    output.setInternshipModule(ctdtDTO.getInternshipModule());
	    output.setThesisModule(ctdtDTO.getThesisModule());
	    output.setSpecializationModule(ctdtDTO.getSpecializationModule());
	    return output;
	}

	public ItemListResponse toOutputItemList(TrainingProgramDTO ctdtDTO) {
	    ItemListResponse output = new ItemListResponse();
	    SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
	    output.setProgramCode(ctdtDTO.getProgramCode()); 
	    output.setVietnameseName(ctdtDTO.getVietnameseName());
	    output.setFieldName(ctdtDTO.getFieldName()); 
	    output.setStatus(ctdtDTO.getStatus()); 
	    output.setSequence(ctdtDTO.getSequence()); 
	    output.setProgramId(ctdtDTO.getProgramId());
	    output.setResponsiblePerson(ctdtDTO.getResponsiblePerson()); 
	    output.setCreatedAt(sdf.format(ctdtDTO.getCreatedAt())); 
	    output.setUpdatedAt(sdf.format(ctdtDTO.getUpdatedAt()));
	    return output;
	}


}
