package com.fcamex.ReviewApp.Repositories;

import com.fcamex.ReviewApp.Entities.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee,Long> {

    Optional<Employee> findByUsername(String username);
}