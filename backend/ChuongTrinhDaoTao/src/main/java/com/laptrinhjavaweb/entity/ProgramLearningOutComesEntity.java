package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

//Table: ChuanDauRa
@Entity
@Table(name= "ProgramLearningOutComes")
@Data
public class ProgramLearningOutComesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long learningOutcomeId;

    @Column
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String learningOutcomeType;

    @Column(length = 500)
    private String detailedlearningOutcomeType;

    @Column
    private int competencyLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;

    @OneToMany(mappedBy = "learningOutcome")
    private List<LearningOutComesObjectiveMatrixEntity> learningOutcomeObjectiveMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "learningOutcome")
    private List<CourseLearningOutcomeMatrixEntity> courseLearningOutcomeMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "learningOutcome")
    private List<CertificationLearningOutcomeMatrixEntity> certificationLearningOutcomeMatrixs = new ArrayList<>();
}
