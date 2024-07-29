package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

@Entity
@Table(name="Course")
@Data
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column
    private String courseName;

    @Column
    private String courseNameEnglish;

    @Column(length = 50)
    private String courseCode;

    @Column
    private int creditHours;

    @Column(length = 50)
    private String responsibleDepartment;

    @Column(length = 50)
    private String courseStatus;

    @Column(length = 50)
    private String createdBy;

    @CreationTimestamp
    private Date createdTime;

    @Column
    private String modifiedBy;

    @UpdateTimestamp
    private Date modifiedTime;

    @OneToMany(mappedBy = "course")
    private List<CourseOutlineEntity> courseOutlines = new ArrayList<>();
}
