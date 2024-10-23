package com.laptrinhjavaweb.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.DetailedProgramEntity;

@Repository
public interface DetailedProgramRepository extends JpaRepository<DetailedProgramEntity, Long> {
	List<DetailedProgramEntity> findByEducationProgramProgramId(Long programId);

	List<DetailedProgramEntity> findByCourseOutlineIdCourseOutlineAndEducationProgramProgramId(Long programId,Long courseOutlineId);

}
