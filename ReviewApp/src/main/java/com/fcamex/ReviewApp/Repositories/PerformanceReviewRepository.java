package com.fcamex.ReviewApp.Repositories;

import com.fcamex.ReviewApp.Entities.Employee;
import com.fcamex.ReviewApp.Entities.PerformanceReview;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PerformanceReviewRepository extends JpaRepository<PerformanceReview,Long> {

    List<PerformanceReview> findByTarget(Employee employee);

}
