package com.laptrinhjavaweb.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.laptrinhjavaweb.entity.LecturersEntity;

public interface LecturersRepository extends JpaRepository<LecturersEntity, Long> {
	Optional<LecturersEntity> findByLecturersCode(String lecturersCode);

//	@Query("SELECT l FROM LecturersEntity l " + "JOIN l.departments d "
//			+ "WHERE (:keyword IS NULL OR l.firstName LIKE %:keyword% OR l.lastName LIKE %:keyword%) "
//			+ "AND (:department IS NULL OR d.departmentCode LIKE %:department%) ")
//	Page<LecturersEntity> findLecturers(@Param("keyword") String keyword, @Param("department") String department,
//			Pageable pageable);

}
