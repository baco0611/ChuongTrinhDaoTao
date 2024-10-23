package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptrinhjavaweb.entity.LearningOutComesObjectiveMatrixEntity;

public interface LearningOutComesObjectiveMatrixRepository
		extends JpaRepository<LearningOutComesObjectiveMatrixEntity, Long> {
	List<LearningOutComesObjectiveMatrixEntity> findByEducationProgramProgramId(Long programId);
}
