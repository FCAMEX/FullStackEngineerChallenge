package com.fcamex.ReviewApp;

import com.fcamex.ReviewApp.Repositories.EmployeeRepository;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.fcamex.ReviewApp.Repositories")
@SpringBootApplication
public class ReviewAppApplication {

	public static void main(String[] args) {
		SpringApplication.run(ReviewAppApplication.class, args);
	}

}
