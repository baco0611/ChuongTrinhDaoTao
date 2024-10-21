package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.Data;

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

    @Column(length = 50, columnDefinition = "nvarchar(255)")
    private String educationLevel;

    @Column(length = 50, columnDefinition = "nvarchar(255)")
    private String admissionTarget;

    @Column
    private Integer duration;

    @Column(columnDefinition = "nvarchar(255)")
    private String trainingMode;

    @Column
    private Integer requiredCredits;

    @Column(columnDefinition = "nvarchar(max)")
    private String graduationConditions;

    @Column(length = 50, columnDefinition = "nvarchar(255)")
    private String diploma;

    @Column(columnDefinition = "nvarchar(max)")
    private String employmentPositionAfterGraduation;

    @Column(columnDefinition = "nvarchar(max)")
    private String advancedSkillsDevelopment;

    @Column(columnDefinition = "nvarchar(max)")
    private String referenceProgram;

    @Column(columnDefinition = "nvarchar(max)")
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "field_of_study_id")
    private FieldOfStudyEntity fieldOfStudy;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="department_id")
    private DepartmentEntity department;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="lecturers_id")
    private LecturersEntity lecturer;
    
    // Other relationships remain unchanged
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
