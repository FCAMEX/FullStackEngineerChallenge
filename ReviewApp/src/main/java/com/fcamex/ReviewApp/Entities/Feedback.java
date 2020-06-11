package com.fcamex.ReviewApp.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class Feedback {

    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long feedbackId;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "review_id", nullable = false)
    private PerformanceReview review;

    @OneToOne
    @JoinColumn(name = "feedback_author_id", nullable = false)
    private Employee feedbackAuthor;

    @Column(name = "content")
    private String content;

    public Long getFeedbackId() {
        return feedbackId;
    }

    public void setFeedbackId(Long feedbackId) {
        this.feedbackId = feedbackId;
    }

    public PerformanceReview getReview() {
        return review;
    }

    public void setReview(PerformanceReview review) {
        this.review = review;
    }

    public Employee getFeedbackAuthor() {
        return feedbackAuthor;
    }

    public void setFeedbackAuthor(Employee feedbackAuthor) {
        this.feedbackAuthor = feedbackAuthor;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
