package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

import lombok.Data;

@Entity
@Table(name = "DetailObjective")
@Data
public class DetailObjectiveEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long objectiveId;

    @Column(length = 50)
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String objectiveType;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private TrainingProgramEntity trainingProgram;

    @OneToMany(mappedBy = "detailObjective")
    private List<OutputStandardDetailObjectiveMatrixEntity> outputStandardDetailObjectiveMatrixs = new ArrayList<>();
}
