package com.laptrinhjavaweb.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.laptrinhjavaweb.entity.CourseLearningOutcomeMatrixEntity;

@Repository
public interface CourseLearningOutcomeMatrixRepository extends JpaRepository<CourseLearningOutcomeMatrixEntity, Long> {
	List<CourseLearningOutcomeMatrixEntity> findByEducationProgram_ProgramId(Long programId);
}
