package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.ProgramObjectiveEntity;

@Repository
public interface ProgramObjectiveRepository extends JpaRepository<ProgramObjectiveEntity, Long> {
    List<ProgramObjectiveEntity> findByEducationProgramProgramId(Long programId);
}
