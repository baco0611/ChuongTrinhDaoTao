package com.laptrinhjavaweb.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.FieldOfStudyEntity;

@Repository
public interface FieldOfStudyRepository extends JpaRepository<FieldOfStudyEntity, Long> {
    Optional<FieldOfStudyEntity> findByFieldCode(String fieldCode);
}
