package com.laptrinhjavaweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.laptrinhjavaweb.entity.LecturersEntity;

public interface LecturersRepository extends JpaRepository<LecturersEntity, Long> {
	Optional<LecturersEntity> findByLecturersCode(String lecturersCode);
}
