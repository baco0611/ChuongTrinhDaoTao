package com.laptrinhjavaweb.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

//Table: MaTranHocPhanChuanDauRa
@Entity
@Table(name="CourseLearningOutcomeMatrix")
@Data
public class CourseLearningOutcomeMatrixEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matrixId;

    @Column
    private int complianceLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="detailedProgramId")
    private DetailedProgramEntity detailedProgram;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="learningOutcomeId")
    private ProgramLearningOutComesEntity learningOutcome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;
}
