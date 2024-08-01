package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptrinhjavaweb.entity.EducationProgramEntity;

public interface TrainingProgramRepository extends JpaRepository<EducationProgramEntity, Long> {
	EducationProgramEntity findByProgramId(Long programId) ;
	List<EducationProgramEntity> findAll();
}
