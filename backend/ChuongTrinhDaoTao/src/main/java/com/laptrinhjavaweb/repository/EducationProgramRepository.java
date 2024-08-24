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
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:department%) "
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:department%)")
	Page<EducationProgramEntity> searchPrograms(@Param("keyword") String keyword,
			@Param("department") String department, Pageable pageable);

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:department% AND ep.status = :status) "
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:department% AND ep.status = :status)")
	Page<EducationProgramEntity> searchProgramsWithStatus(@Param("keyword") String keyword,
			@Param("department") String department, @Param("status") int status, Pageable pageable);


	// Tìm những chương trình theo role, hoặc gv được phân công
	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE ((l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND l.lecturersCode LIKE %:lecturerCode% AND ep.status = :status)"
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND l.lecturersCode LIKE %:lecturerCode% AND ep.status = :status))")
	Page<EducationProgramEntity> manageProgramsIsUserWithStatus(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode, @Param("lecturerCode") String lecturerCode,@Param("status") int status,
			Pageable pageable);
	
	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE ((l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND l.lecturersCode LIKE %:lecturerCode% )"
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND l.lecturersCode LIKE %:lecturerCode% ))")
	Page<EducationProgramEntity> manageProgramsIsUser(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode, @Param("lecturerCode") String lecturerCode,
			Pageable pageable);
	
	//Tìm tất cả
	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE ((l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND ep.status = :status)"
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND ep.status = :status))")
	Page<EducationProgramEntity> manageProgramsAllWithStatus(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode,@Param("status") int status,
			Pageable pageable);
	
	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE ((l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% )"
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% ))")
	Page<EducationProgramEntity> manageProgramsAll(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode,
			Pageable pageable);

	// Tìm ra khoa mà gv đó quản lý
	@Query("SELECT d.departmentCode FROM DepartmentEntity d " + "JOIN d.lecturers l "
			+ "WHERE l.departmentManager = true " + "AND l.lecturersCode LIKE %:lecturersCode%")
	String findDepartmentCodesByManagerLecturerCode(@Param("lecturersCode") String lecturersCode);

	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND ep.status = :status) "
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode% AND ep.status = :status)")
	Page<EducationProgramEntity> searchProgramsOfDepartmentCodesByManagerLecturerCodeWithStatus(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode, @Param("status") int status ,Pageable pageable );
	
	@Query("SELECT ep FROM EducationProgramEntity ep " + "JOIN ep.department d " + "JOIN ep.lecturer l "
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode%) "
			+ "OR (ep.vietnameseName LIKE %:keyword% AND d.departmentCode LIKE %:departmentCode%)")
	Page<EducationProgramEntity> searchProgramsOfDepartmentCodesByManagerLecturerCode(@Param("keyword") String keyword,
			@Param("departmentCode") String departmentCode ,Pageable pageable );

}
