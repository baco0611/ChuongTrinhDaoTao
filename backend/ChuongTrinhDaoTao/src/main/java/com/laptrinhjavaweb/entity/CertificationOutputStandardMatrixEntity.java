package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="CertificationOutputStandardMatrix")
@Data
public class CertificationOutputStandardMatrixEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matrixId;

    @Column
    private int proficiencyLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="certificationId")
    private CertificationRequirementEntity certificationRequirement;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="outputStandardId")
    private OutputStandardEntity outputStandard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private TrainingProgramEntity trainingProgram;
}
