package com.fcamex.ReviewApp.Repositories;

import com.fcamex.ReviewApp.Entities.Employee;
import com.fcamex.ReviewApp.Entities.Feedback;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FeedbackRepository extends JpaRepository<Feedback,Long> {

    List<Feedback> findByFeedbackAuthor(Long id);
}