package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptrinhjavaweb.entity.TrainingProgramEntity;

public interface TrainingProgramRepository extends JpaRepository<TrainingProgramEntity, Long> {
	TrainingProgramEntity findByProgramId(Long programId) ;
	 List<TrainingProgramEntity> findAll();
}
