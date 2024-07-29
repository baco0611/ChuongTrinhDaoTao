package com.laptrinhjavaweb.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="OutputStandardDetailObjectiveMatrix")
@Data
public class OutputStandardDetailObjectiveMatrixEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long matrixId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="outputStandardId")
    private OutputStandardEntity outputStandard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="objectiveId")
    private DetailObjectiveEntity detailObjective;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private TrainingProgramEntity trainingProgram;
}
