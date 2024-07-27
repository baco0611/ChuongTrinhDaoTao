package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name="CourseOutline")
@Data
public class CourseOutlineEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCourseOutline;

    @Column
    private int version;

    @Column
    private int theoryHours;

    @Column
    private int exerciseHours;

    @Column
    private int discussionHours;

    @Column 
    private int practicalHours;

    @Column
    private int internshipHours;

    @OneToMany(mappedBy = "courseOutline")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="courseId")
    private CourseEntity course;
}

