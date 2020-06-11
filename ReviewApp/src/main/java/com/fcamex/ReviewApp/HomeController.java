package com.fcamex.ReviewApp;

import com.fcamex.ReviewApp.Entities.Employee;
import com.fcamex.ReviewApp.Entities.Feedback;
import com.fcamex.ReviewApp.Entities.PerformanceReview;
import com.fcamex.ReviewApp.Repositories.EmployeeRepository;
import com.fcamex.ReviewApp.Repositories.FeedbackRepository;
import com.fcamex.ReviewApp.Repositories.PerformanceReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Controller
public class HomeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PerformanceReviewRepository reviewRepository;

    @Autowired
    private FeedbackRepository feedbackRepository;

    /* api call that returns all reviews for a specific user based on his employeeId
    utilized to populate the admin review page*/
    @ResponseBody
    @GetMapping(value = "/api/reviews/{employeeId}")
    public List<PerformanceReview> getReviews(@PathVariable Long employeeId) {

        Optional<Employee> temp = employeeRepository.findById(employeeId);
        List<PerformanceReview> holder;

        if (temp.isPresent()) {
            holder = reviewRepository.findByTarget(temp.get());
            return holder;
        } else {
            return new ArrayList<PerformanceReview>();
        }
    }

    /*api call that returns all the user reviews for the currently authenticated user
     * utilized to populate the non-admin review page */
    @ResponseBody
    @GetMapping(value = "/api/userReviews")
    public List<PerformanceReview> getUserReviews(Authentication auth) {
        Optional<Employee> current = employeeRepository.findByUsername(auth.getName());

        if (current.isPresent()) {
            return reviewRepository.findByTarget(current.get());


        } else {
            return new ArrayList<PerformanceReview>();
        }
    }

    /*api call that adds/creates a new feedback for a specific user and performance review.
     * It autimatically takes your user information and assigns you as the author */
    @ResponseBody
    @PostMapping(value = "/api/feedback")
    public void addReview(@RequestBody Feedback feedback, Authentication auth) {

        Optional<Employee> current = employeeRepository.findByUsername(auth.getName());
        Optional<PerformanceReview> review = reviewRepository.findById(feedback.getFeedbackId());

        if (current.isPresent() && review.isPresent()) {

            Feedback temp = new Feedback();
            temp.setContent(feedback.getContent());
            temp.setFeedbackAuthor(current.get());
            PerformanceReview pr = review.get();

            temp.setReview(pr);
            feedbackRepository.save(temp);

        }
    }

    /*creates a new performance review and sets the currently authenticated user as the author*/

    @ResponseBody
    @PostMapping(value = "/api/review")
    public void addReview(@RequestBody PerformanceReview review, Authentication auth) {

        Optional<Employee> current = employeeRepository.findByUsername(auth.getName());

        if (current.isPresent()) {
            review.setAuthorName(current.get().getFullName());
            reviewRepository.save(review);
        }
    }

    /*updates a performance review and sets the currently authenticated user as the author/editor*/
    @ResponseBody
    @PutMapping(value = "/api/review")
    public void updateReview(@RequestBody PerformanceReview review, Authentication auth) {

        Optional<Employee> current = employeeRepository.findByUsername(auth.getName());

        Optional<Employee> saveEmployee = employeeRepository.findById(review.getTarget().getEmployeeId());

        if (current.isPresent() && saveEmployee.isPresent()) {
            Employee tempEmployee = saveEmployee.get();
            List<PerformanceReview> tempList = tempEmployee.getReviewList();

            for (PerformanceReview pr : tempList) {
                if (pr.getReviewId() == review.getReviewId()) {
                    pr.setAuthorName(current.get().getFullName());
                    pr.setContent(review.getContent());
                    pr.setTitle(review.getTitle());
                }
            }

            tempEmployee.setReviewList(tempList);

            employeeRepository.save(tempEmployee);

        }
    }

    /*mapping of all the url's utilized in this application*/
    @RequestMapping(value = {"/", "/employees", "/employees/**", "/reviews/**", "/review/**", "/employee_reviews/**", "/feedback/**", "/logout", "/login"})
    public String index() {
        return "index";
    }


}
