package com.laptrinhjavaweb.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.laptrinhjavaweb.entity.CertificationRequirementEntity;
import com.laptrinhjavaweb.repository.CertificationRequirementRepository;

@Service
public class CertificationRequirementService {

	@Autowired
	private CertificationRequirementRepository repo;

	public Map<String, Object> getAllCertificationRequirements() {
		Map<String, Object> response = new HashMap<>();
		List<CertificationRequirementEntity> certificationRequirements = repo.findAll();
		List<Map<String, Object>> data = certificationRequirements.stream().map(cert -> {
			Map<String, Object> certMap = new HashMap<>();
			certMap.put("id", cert.getCertificationId());
			certMap.put("condition", cert.getCertificationName());
			return certMap;
		}).collect(Collectors.toList());

		response.put("data", data);
		response.put("status", 200);

		return response;
	}

	public String updateCertificationRequirement(Long id, String condition) {
		CertificationRequirementEntity entity = repo.findById(id).orElse(null);
		if (entity == null) {
			return "Certification requirement not found.";
		}
		entity.setCertificationName(condition);
		repo.save(entity);
		return null;
	}

	public Map<String, Object> deleteCertificationRequirement(Long id) {
		repo.deleteById(id);
		Map<String, Object> response = new HashMap<>();
		List<CertificationRequirementEntity> certificationRequirements = repo.findAll();
		List<Map<String, Object>> data = certificationRequirements.stream().map(cert -> {
			Map<String, Object> certMap = new HashMap<>();
			certMap.put("id", cert.getCertificationId());
			certMap.put("condition", cert.getCertificationName());
			return certMap;
		}).collect(Collectors.toList());

		response.put("data", data);
		response.put("status", 200);

		return response;
	}

	public Map<String, Object> createCertificationRequirements() {
		Map<String, Object> response = new HashMap<>();
		CertificationRequirementEntity certificationRequirementEntity = new CertificationRequirementEntity();
		certificationRequirementEntity.setCertificationName("");
		repo.save(certificationRequirementEntity);
		List<CertificationRequirementEntity> certificationRequirements = repo.findAll();
		List<Map<String, Object>> data = certificationRequirements.stream().map(cert -> {
			Map<String, Object> certMap = new HashMap<>();
			certMap.put("id", cert.getCertificationId());
			certMap.put("condition", cert.getCertificationName());
			return certMap;
		}).collect(Collectors.toList());

		response.put("data", data);
		response.put("status", 200);

		return response;
	}
}