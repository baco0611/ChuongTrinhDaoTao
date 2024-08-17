package com.laptrinhjavaweb.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptrinhjavaweb.entity.EducationProgramEntity;

public interface EducationProgramRepository extends JpaRepository<EducationProgramEntity, Long> {
	EducationProgramEntity findByProgramId(Long programId);

	List<EducationProgramEntity> findAll();

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (:keyword IS NULL OR " + "ep.vietnameseName LIKE %:keyword% OR "
			+ "l.firstName LIKE %:keyword%) OR " + "(:department IS NULL OR d.departmentCode = :department)")
	Page<EducationProgramEntity> searchPrograms(@Param("keyword") String keyword,
			@Param("department") String department, Pageable pageable);
}
