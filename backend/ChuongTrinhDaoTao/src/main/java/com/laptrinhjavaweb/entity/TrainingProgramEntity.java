package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "TrainingProgram")
@Data
public class TrainingProgramEntity {
    
    @Column(nullable = true, columnDefinition = "INTEGER DEFAULT 1")
    private Integer sequence;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    @Column(unique = true)
    private String programCode;

    @Column(length = 50)
    private String version;

    @Column
    private String vietnameseName;

    @Column
    private String englishName;

    @Column(length = 50)
    private String educationLevel;

    @Column(length = 50)
    private String fieldCode;

    @Column(length = 500)
    private String fieldName;

    @Column
    private String programManagementDepartment;

    @Column(length = 50)
    private String admissionTarget;

    @Column
    private Integer duration;

    @Column
    private String trainingMode;

    @Column
    private Integer requiredCredits;

    @Column(columnDefinition = "TEXT")
    private String graduationRequirements;

    @Column(length = 50)
    private String diploma;

    @Column(columnDefinition = "TEXT")
    private String employmentPositionAfterGraduation;

    @Column(columnDefinition = "TEXT")
    private String advancedSkillsDevelopment;

    @Column(columnDefinition = "TEXT")
    private String referenceProgram;

    @Column(columnDefinition = "TEXT")
    private String overallObjectives;

    @Column
    private String responsiblePerson;

    @Column
    private Integer currentStep;

    @Column
    private Integer status;

    @Column
    private Integer generalModule;

    @Column
    private Integer basicFieldModule;

    @Column
    private Integer majorFieldModule;

    @Column
    private Integer supportModule;

    @Column
    private Integer internshipModule;

    @Column
    private Integer thesisModule;

    @Column
    private Integer specializationModule;

    @Temporal(TemporalType.DATE)
    @Column(name = "created_at", nullable = true, updatable = false)
    private Date createdAt;

    @Temporal(TemporalType.DATE)
    @Column(name = "updated_at", nullable = true)
    private Date updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = new Date();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = new Date();
    }

    @OneToMany(mappedBy = "trainingProgram")
    private List<SpecializationTrainingEntity> specializations = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<DetailObjectiveEntity> detailObjectives = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<OutputStandardEntity> outputStandards = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<OutputStandardDetailObjectiveMatrixEntity> outputStandardDetailObjectiveMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<CourseOutputStandardMatrixEntity> courseOutputStandardMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "trainingProgram")
    private List<CertificationOutputStandardMatrixEntity> certificationOutcomeMatrixs = new ArrayList<>();
}
