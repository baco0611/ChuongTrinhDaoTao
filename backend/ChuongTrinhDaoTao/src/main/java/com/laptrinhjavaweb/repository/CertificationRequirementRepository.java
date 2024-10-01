package com.laptrinhjavaweb.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.CertificationRequirementEntity;

@Repository
public interface CertificationRequirementRepository extends JpaRepository<CertificationRequirementEntity, Long> {
}
