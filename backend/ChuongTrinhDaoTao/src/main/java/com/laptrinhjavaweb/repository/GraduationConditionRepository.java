package com.laptrinhjavaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.GraduationConditionEntity;

@Repository
public interface GraduationConditionRepository extends JpaRepository<GraduationConditionEntity, Long> {
}
