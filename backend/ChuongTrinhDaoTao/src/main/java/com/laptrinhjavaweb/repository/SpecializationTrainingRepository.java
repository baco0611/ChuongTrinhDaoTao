package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.SpecializationTrainingEntity;

@Repository
public interface SpecializationTrainingRepository extends JpaRepository<SpecializationTrainingEntity, Long> {
	 List<SpecializationTrainingEntity> findByEducationProgram_ProgramId(Long programId);
}
