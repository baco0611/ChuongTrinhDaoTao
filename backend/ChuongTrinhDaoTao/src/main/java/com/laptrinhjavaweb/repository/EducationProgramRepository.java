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
			+ "WHERE (:keyword IS NULL OR ep.vietnameseName LIKE %:keyword% OR l.firstName LIKE %:keyword%) "
			+ "OR (:department IS NULL OR d.departmentCode = :department)")
	Page<EducationProgramEntity> searchPrograms(@Param("keyword") String keyword,
			@Param("department") String department, Pageable pageable);

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (:keyword IS NULL OR ep.vietnameseName LIKE %:keyword% OR l.firstName LIKE %:keyword%) "
			+ "OR (:department IS NULL OR d.departmentCode = :department) "
			+ "OR (:lecturerCode IS NULL OR l.lecturersCode = :lecturerCode)")
	Page<EducationProgramEntity> managePrograms(@Param("keyword") String keyword,
			@Param("department") String department, @Param("lecturerCode") String lecturerCode, Pageable pageable);

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (:keyword IS NULL OR ep.vietnameseName LIKE %:keyword%) "
			+ "AND (:keyword IS NULL OR l.firstName LIKE %:keyword%) "
			+ "AND (:department IS NULL OR d.departmentCode LIKE %:department%) "
			+ "AND (:lecturerCode IS NULL OR l.lecturersCode = :lecturerCode)")
	Page<EducationProgramEntity> findByLecturersCode(@Param("keyword") String keyword,
			@Param("department") String department, @Param("lecturerCode") String lecturerCode, Pageable pageable);

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN d.lecturers l "
			+ "WHERE (:keyword IS NULL OR ep.vietnameseName LIKE %:keyword%) "
			+ "AND (:department IS NULL OR d.departmentCode LIKE %:department%) "
			+ "AND (:lecturerCode IS NULL OR l.lecturersCode = :lecturerCode) ")
	Page<EducationProgramEntity> findAllByLecturerIdAndFilter(@Param("keyword") String keyword,
			@Param("department") String department, @Param("lecturerCode") String lecturerCode, Pageable pageable);

}
