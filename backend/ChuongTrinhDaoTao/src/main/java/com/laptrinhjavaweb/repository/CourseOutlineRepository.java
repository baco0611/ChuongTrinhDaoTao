package com.laptrinhjavaweb.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.laptrinhjavaweb.entity.CourseOutlineEntity;

@Repository
public interface CourseOutlineRepository extends JpaRepository<CourseOutlineEntity, Long> {

}
