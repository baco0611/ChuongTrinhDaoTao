package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

//Table: MaTranChungChiChuanDauRa
@Entity
@Table(name="CertificationOutputStandardMatrix")
@Data
public class CertificationLearningOutcomeMatrixEntity { 

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matrixId;

    @Column
    private Integer competencyLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="certificationId")
    private CertificationRequirementEntity certificationRequirement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="learningOutcomeId")
    private ProgramLearningOutComesEntity learningOutcome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;

}
