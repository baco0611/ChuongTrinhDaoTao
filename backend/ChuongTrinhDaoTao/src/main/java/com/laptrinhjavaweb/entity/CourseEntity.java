package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import jakarta.persistence.*;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;

//Table: HocPhan
@Entity
@Table(name="Course")
@Data
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long courseId;

    @Column(columnDefinition = "nvarchar(255)")
    private String courseName;

    @Column
    private String courseNameEnglish;

    @Column(length = 50)
    private String courseCode;

    @Column
    private int creditNumbers;

    @Column(length = 50)
    private String courseStatus;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "lecturersId")
    private LecturersEntity responsiblePerson;

    @OneToMany(mappedBy = "course")
    private List<CourseOutlineEntity> courseOutlines = new ArrayList<>();
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "departmentId")
    private DepartmentEntity department;
}
