package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import com.laptrinhjavaweb.converter.StringListConverter;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Convert;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

//Table: ChuongTrinhChiTiet
@Entity
@Table(name="DetailedProgram")
@Data
public class DetailedProgramEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long detailedProgramId;
    
    @Column(name = "`index`") 
    private Integer index;
    
    @Column
    private Boolean mandatory;
    
    @Column 
    private Boolean replacesThesis;
    
    @Convert(converter = StringListConverter.class)
    @Column(name = "prerequisite_course")
    private List<String> prerequisiteCourse = new ArrayList<>();
    
    @Convert(converter = StringListConverter.class)
    @Column(name = "prior_course")
    private List<String> priorCourse = new ArrayList<>();
    
    @Convert(converter = StringListConverter.class)
    @Column(name = "concurrent_course")
    private List<String> concurrentCourse = new ArrayList<>();
    
    @Column
    private int semester;

    @Column(columnDefinition = "nvarchar(255)")
    private String knowledgeModule;

    @Column(columnDefinition = "nvarchar(255)")
    private String detailedKnowledgeModule;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="idCourseOutline")
    private CourseOutlineEntity courseOutline;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="specializationId")
    private SpecializationTrainingEntity specializationTraining;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;

    @ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinTable(name = "detailedProgram_certificationRequirement", joinColumns = @JoinColumn(name = "detailedProgramId"), 
                                  inverseJoinColumns = @JoinColumn(name = "certificationId"))
    private List<CertificationRequirementEntity> certificationRequirements = new ArrayList<>();

    @OneToMany(mappedBy = "detailedProgram", cascade = CascadeType.ALL)
    private List<CourseLearningOutcomeMatrixEntity> courseOutputStandardMatrixs = new ArrayList<>();
}

