package com.fcamex.ReviewApp.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
public class Employee {

    @Column(name="employee_id")
    private @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long employeeId;

    @Column(name="first_name")
    private String firstName;

    @Column(name="last_name")
    private String lastName;

    @Column(name="department")
    private String department;

    @Column(name="title")
    private String title;

    @Column(name="is_admin", columnDefinition = "boolean default false" )
    private Boolean isAdmin;

    @Column(name="username", unique=true)
    private String username;

    @Column(name="password")
    private String password;

    @JsonIgnore
    @OneToMany(mappedBy = "target", cascade = CascadeType.REMOVE, orphanRemoval = true)
    private List<PerformanceReview> reviewList;

    public Long getEmployeeId() {
        return employeeId;
    }

    public void setEmployeeId(Long employeeId) {
        this.employeeId = employeeId;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public Boolean getAdmin() {
        return isAdmin;
    }

    public void setAdmin(Boolean admin) {
        isAdmin = admin;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<PerformanceReview> getReviewList() {
        return reviewList;
    }

    public void setReviewList(List<PerformanceReview> reviewList) {
        this.reviewList = reviewList;
    }

    public String getFullName(){
        return this.firstName + " " + this.lastName;
    }

}
