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

	@Query("SELECT l FROM LecturersEntity l " + "JOIN l.department d "
			+ "WHERE (:department IS NULL OR d.departmentCode LIKE %:department%) "
			+ "AND (:keyWord IS NULL OR (l.firstName LIKE %:keyWord% AND l.lastName LIKE %:keyWord%))")
	Page<LecturersEntity> findByDepartmentAndKeyWord(@Param("department") String department,
			@Param("keyWord") String keyWord, Pageable pageable);

}
