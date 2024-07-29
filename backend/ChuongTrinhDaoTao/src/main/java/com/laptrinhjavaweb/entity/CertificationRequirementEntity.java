package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="CertificationRequirement")
@Data
public class CertificationRequirementEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long certificationId;

    @Column(length = 500)
    private String certificationName;

    @ManyToMany(mappedBy = "certificationRequirements")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();

    @OneToMany(mappedBy = "certificationRequirement")
    private List<CertificationOutputStandardMatrixEntity> certificationOutputStandardMatrixs = new ArrayList<>();
}
