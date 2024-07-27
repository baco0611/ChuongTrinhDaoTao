package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="DetailedProgram")
@Data
public class DetailedProgramEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detailedProgramId;

    @Column
    private Boolean mandatory;

    @Column 
    private Boolean replacesThesis;

    @Column(length = 50)
    private String prerequisite;

    @Column(length = 50)
    private String priorCourse;

    @Column(length = 50)
    private String concurrentCourse;

    @Column
    private int semester;

    @Column
    private String knowledgeBlock;

    @Column 
    private String detailedKnowledgeBlock;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="idCourseOutline")
    private CourseOutlineEntity courseOutline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="specializationId")
    private SpecializationTrainingEntity specializationTraining;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="idProgram")
    private TrainingProgramEntity trainingProgram;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "detailedProgram_certificationRequirement", joinColumns = @JoinColumn(name = "detailedProgramId"), 
                                  inverseJoinColumns = @JoinColumn(name = "certificationId"))
    private List<CertificationRequirementEntity> certificationRequirements = new ArrayList<>();

    @OneToMany(mappedBy = "detailedProgram")
    private List<CourseOutputStandardMatrixEntity> courseOutputStandardMatrixs = new ArrayList<>();
}

