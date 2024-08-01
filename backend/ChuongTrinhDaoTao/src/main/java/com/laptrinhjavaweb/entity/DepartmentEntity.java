package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

//Table: DonVi 
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table (name = "Department")
public class DepartmentEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long departmentId;
	
	private String departmentCode;
	
	private String departmentName;
	
	@OneToMany(mappedBy = "department")
    private List<LecturersEntity> lecturers = new ArrayList<>();
}
