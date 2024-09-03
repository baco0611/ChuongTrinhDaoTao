package com.laptrinhjavaweb.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptrinhjavaweb.entity.EducationProgramEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;

public interface LecturersRepository extends JpaRepository<LecturersEntity, Long> {
	Optional<LecturersEntity> findByLecturersCode(String lecturersCode);

	@Query("SELECT l FROM LecturersEntity l " + "JOIN l.department d "
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:department%) "
			+ "OR (l.lastName LIKE %:keyword% AND d.departmentCode LIKE %:department%)")
	Page<LecturersEntity> findByDepartmentAndKeyWord(@Param("department") String department,
			@Param("keyword") String keyWord, Pageable pageable);
	



}
