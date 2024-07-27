package com.laptrinhjavaweb.service;

import java.util.List;

import com.laptrinhjavaweb.dto.TrainingProgramDTO;

public interface ITrainingProgramService {
	TrainingProgramDTO findbyIdProgram(Long programId) throws Exception;

	TrainingProgramDTO save(TrainingProgramDTO ctdtDTO) throws Exception;

	List<TrainingProgramDTO> findAll();
}
