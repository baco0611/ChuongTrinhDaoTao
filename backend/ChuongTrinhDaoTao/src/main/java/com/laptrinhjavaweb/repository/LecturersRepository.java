package com.laptrinhjavaweb.repository;

import java.util.List;
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
			+ "WHERE (l.firstName LIKE %:keyword% AND d.departmentCode LIKE %:department% AND l.deleted = false) "
			+ "OR (l.lastName LIKE %:keyword% AND d.departmentCode LIKE %:department% AND l.deleted = false)")
	Page<LecturersEntity> findByDepartmentAndKeyWord(@Param("department") String department,
			@Param("keyword") String keyWord, Pageable pageable);
	
    Optional<LecturersEntity> findByEmail(String email);
    
    boolean existsByLecturersCode(String lecturersCode);
    
    boolean existsByEmail(String email);
    
    @Query("SELECT l FROM LecturersEntity l " +
            "WHERE l.firstName LIKE %:keyWord% OR l.lastName LIKE %:keyWord%")
     List<LecturersEntity> findByKeyWord(@Param("keyWord") String keyWord);
     
     List<LecturersEntity> findByDepartment_DepartmentCode(String departmentCode);
}
