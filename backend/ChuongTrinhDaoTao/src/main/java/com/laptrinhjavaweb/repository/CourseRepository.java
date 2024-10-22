package com.laptrinhjavaweb.repository;

import com.laptrinhjavaweb.entity.CourseEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

    @Query("SELECT c FROM CourseEntity c WHERE c.courseCode LIKE %:courseCode% AND c.courseName LIKE %:courseName%")
    List<CourseEntity> searchCourses(@Param("courseCode") String courseCode, @Param("courseName") String courseName);
}
