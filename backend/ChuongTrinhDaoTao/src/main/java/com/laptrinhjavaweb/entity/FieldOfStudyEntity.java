package com.laptrinhjavaweb.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "FieldOfStudy")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FieldOfStudyEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "field_code", length = 50, nullable = false, unique = true)
	private String fieldCode;

	@Column(name = "field_name", columnDefinition = "nvarchar(255)", nullable = false)
	private String fieldName;

	// One field of study can have many education programs
	@OneToMany(mappedBy = "fieldOfStudy", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private List<EducationProgramEntity> educationPrograms;
}
