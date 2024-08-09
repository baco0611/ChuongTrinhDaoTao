package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;
import jakarta.persistence.*;

import lombok.Data;

//Table: MucTieu
@Entity
@Table(name = "ProgramObjective")
@Data
public class ProgramObjectiveEntity {

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
    private EducationProgramEntity educationProgram;

    @OneToMany(mappedBy = "objective")
    private List<LearningOutComesObjectiveMatrixEntity> outputStandardDetailObjectiveMatrixs = new ArrayList<>();
}
