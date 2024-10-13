package com.laptrinhjavaweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptrinhjavaweb.entity.DepartmentEntity;
import com.laptrinhjavaweb.entity.LecturersEntity;

public interface DepartmentRepository extends JpaRepository<DepartmentEntity, Long> {
	DepartmentEntity findByDepartmentId(Long departmentId);
	Optional<DepartmentEntity> findByDepartmentCode(String departmentCode);
}

