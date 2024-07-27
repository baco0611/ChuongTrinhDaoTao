package com.laptrinhjavaweb.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.converter.TrainingProgramConverter;
import com.laptrinhjavaweb.dto.TrainingProgramDTO;
import com.laptrinhjavaweb.entity.TrainingProgramEntity;
import com.laptrinhjavaweb.repository.TrainingProgramRepository;
import com.laptrinhjavaweb.service.ITrainingProgramService;

@Service
public class TrainingProgramService implements ITrainingProgramService {

	@Autowired
	private TrainingProgramRepository trainingProgramRepository;
	
	@Autowired
	private TrainingProgramConverter trainingProgramConverter;
	
	@Override
	public TrainingProgramDTO findbyIdProgram(Long programId) throws Exception {
		TrainingProgramEntity trainingProgramEntity = trainingProgramRepository.findByProgramId(programId);
		if (trainingProgramEntity==null) {
			return null;
		}
		TrainingProgramDTO chuongTrinhDaoTaoDTO = trainingProgramConverter.toDTO(trainingProgramEntity);
		return chuongTrinhDaoTaoDTO;
	}
	
	@Override
	public TrainingProgramDTO save(TrainingProgramDTO ctdtDTO) throws Exception {
		TrainingProgramEntity ctdtEntity = trainingProgramRepository.save(trainingProgramConverter.toEntity(ctdtDTO));
		return trainingProgramConverter.toDTO(ctdtEntity);
	}
	@Override
	public List<TrainingProgramDTO> findAll() {
		List<TrainingProgramDTO> lstDTO = new ArrayList<TrainingProgramDTO>();
		List<TrainingProgramEntity> lstEntity = trainingProgramRepository.findAll();
		for (TrainingProgramEntity trainingProgramEntity : lstEntity) {
			TrainingProgramDTO dto = new TrainingProgramDTO();
			dto= trainingProgramConverter.toDTO(trainingProgramEntity);
			lstDTO.add(dto);
		}
		return lstDTO;
	}

}
