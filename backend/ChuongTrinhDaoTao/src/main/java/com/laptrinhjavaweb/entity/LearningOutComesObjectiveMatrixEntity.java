package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

//Table: MaTranChuanDaRaMucTieu
@Entity
@Table(name="LearningOutComesObjectiveMatrix")
@Data
public class LearningOutComesObjectiveMatrixEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matrixId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="learningOutcomeId")
    private ProgramLearningOutComesEntity learningOutcome;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="objectiveId")
    private ProgramObjectiveEntity objective;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;
}
