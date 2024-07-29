package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name= "OutputStandard")
@Data
public class OutputStandardEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long outputStandardId;

    @Column
    private String symbol;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Column
    private String outputStandardType;

    @Column(length = 500)
    private String detailedOutputStandardType;

    @Column
    private int competencyLevel;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="idChuongTrinh")
    private TrainingProgramEntity trainingProgram;

    @OneToMany(mappedBy = "outputStandard")
    private List<OutputStandardDetailObjectiveMatrixEntity> outputStandardDetailObjectiveMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "outputStandard")
    private List<CourseOutputStandardMatrixEntity> courseOutputStandardMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "outputStandard")
    private List<CertificationOutputStandardMatrixEntity> certificationOutputStandardMatrixs = new ArrayList<>();
}
