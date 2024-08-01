package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.EducationProgramConverter;
import com.laptrinhjavaweb.dto.TrainingProgramDTO;
import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.repository.TrainingProgramRepository;
import com.laptrinhjavaweb.service.ITrainingProgramService;

@Service
public class TrainingProgramService implements ITrainingProgramService {

	@Autowired
	private TrainingProgramRepository trainingProgramRepository;
	
	@Autowired
	private EducationProgramConverter trainingProgramConverter;
	
	@Override
	public TrainingProgramDTO findbyIdProgram(Long programId) throws Exception {
		EducationProgramEntity trainingProgramEntity = trainingProgramRepository.findByProgramId(programId);
		if (trainingProgramEntity==null) {
			return null;
		}
		TrainingProgramDTO chuongTrinhDaoTaoDTO = trainingProgramConverter.toDTO(trainingProgramEntity);
		return chuongTrinhDaoTaoDTO;
	}
	
	@Override
	public TrainingProgramDTO save(TrainingProgramDTO ctdtDTO) throws Exception {
		EducationProgramEntity ctdtEntity = trainingProgramRepository.save(trainingProgramConverter.toEntity(ctdtDTO));
		return trainingProgramConverter.toDTO(ctdtEntity);
	}
	@Override
	public List<TrainingProgramDTO> findAll() {
		List<TrainingProgramDTO> lstDTO = new ArrayList<TrainingProgramDTO>();
		List<EducationProgramEntity> lstEntity = trainingProgramRepository.findAll();
		for (EducationProgramEntity trainingProgramEntity : lstEntity) {
			TrainingProgramDTO dto = new TrainingProgramDTO();
			dto= trainingProgramConverter.toDTO(trainingProgramEntity);
			lstDTO.add(dto);
		}
		return lstDTO;
	}

}
