package com.laptrinhjavaweb.entity;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.*;
import lombok.Data;

//Table: ChuyenNganhDaoTao
@Entity
@Table(name="SpecializationTraining")
@Data
public class SpecializationTrainingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long specializationId;

    @Column(columnDefinition = "nvarchar(255)")
    private String specializationName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="programId")
    private EducationProgramEntity educationProgram;

    @OneToMany(mappedBy = "specializationTraining")
    private List<DetailedProgramEntity> detailedPrograms = new ArrayList<>();
}
