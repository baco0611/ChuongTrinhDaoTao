package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.ProgramLearningOutComesEntity;

@Repository
public interface ProgramLearningOutComesRepository extends JpaRepository<ProgramLearningOutComesEntity, Long> {
    List<ProgramLearningOutComesEntity> findByEducationProgramProgramId(Long programId);
}
