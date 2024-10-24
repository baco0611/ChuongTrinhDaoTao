package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

//Table: DeCuongHocPhan
@Entity
@Table(name="CourseOutline")
@Data
public class CourseOutlineEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCourseOutline;

    @Column
    private Integer version;

    @Column
    private Integer theoryHours;

    @Column
    private Integer exerciseHours;

    @Column
    private Integer discussionHours;

    @Column 
    private Integer practicalHours;

    @Column
    private Integer internshipHours;
    
    @Column
    private Integer testHours;

    @OneToMany(mappedBy = "courseOutline")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="courseId")
    private CourseEntity course;
}

