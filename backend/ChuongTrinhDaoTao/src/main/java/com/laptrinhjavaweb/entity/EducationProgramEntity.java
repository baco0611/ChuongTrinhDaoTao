package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

//Table: ChuongTrinhDaoTao
@Entity
@Table(name = "EducationProgram")
@Data
public class EducationProgramEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long programId;

    @Column(unique = true)
    private String programCode;

    @Column(length = 50)
    private String version;

    @Column(columnDefinition = "nvarchar(255)")
    private String vietnameseName;

    @Column
    private String englishName;

    @Column(length = 50)
    private String educationLevel;

    @Column(length = 50)
    private String fieldCode;

    @Column(length = 500, columnDefinition = "nvarchar(255)")
    private String fieldName;

    @Column(columnDefinition = "nvarchar(255)")
    private String managingDepartment;

    @Column(length = 50, columnDefinition = "nvarchar(255)")
    private String admissionTarget;

    @Column
    private Integer duration;

    @Column(columnDefinition = "nvarchar(255)")
    private String trainingMode;

    @Column
    private Integer requiredCredits;

    @Column(columnDefinition = "TEXT")
    private String graduationConditions;

    @Column(length = 50, columnDefinition = "nvarchar(255)")
    private String diploma;

    @Column(columnDefinition = "TEXT")
    private String employmentPositionAfterGraduation;

    @Column(columnDefinition = "TEXT")
    private String advancedSkillsDevelopment;

    @Column(columnDefinition = "TEXT")
    private String referenceProgram;

    @Column(columnDefinition = "TEXT")
    private String overallObjectives;

    @Column(columnDefinition = "nvarchar(255)")
    private String responsiblePerson;

    @Column
    private Integer currentStep;

    @Column
    private Integer status;

    @Column
    private Integer generalModule;

    @Column
    private Integer foundationModule;

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

    @OneToMany(mappedBy = "educationProgram")
    private List<SpecializationTrainingEntity> specializations = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<ProgramObjectiveEntity> detailObjectives = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<ProgramLearningOutComesEntity> outputStandards = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<LearningOutComesObjectiveMatrixEntity> outputStandardDetailObjectiveMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<CourseLearningOutcomeMatrixEntity> courseOutputStandardMatrixs = new ArrayList<>();

    @OneToMany(mappedBy = "educationProgram")
    private List<CertificationLearningOutcomeMatrixEntity> certificationOutcomeMatrixs = new ArrayList<>();
}
