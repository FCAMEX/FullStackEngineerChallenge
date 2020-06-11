package com.fcamex.ReviewApp;

import com.fcamex.ReviewApp.Entities.Employee;
import com.fcamex.ReviewApp.Entities.PerformanceReview;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;


@Configuration
public class ExposeEntityIdRestConfiguration implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config) {
        config.exposeIdsFor(Employee.class);
        config.exposeIdsFor(PerformanceReview.class);
    }

}