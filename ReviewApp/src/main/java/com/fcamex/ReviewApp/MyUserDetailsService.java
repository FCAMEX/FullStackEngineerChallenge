package com.fcamex.ReviewApp;

import com.fcamex.ReviewApp.Entities.Employee;
import com.fcamex.ReviewApp.Repositories.EmployeeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    EmployeeRepository employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
        Optional<Employee> user = employeeRepository.findByUsername(username);

        if(user.isPresent()) {
            return user.map(MyUserDetails::new).get();
        }else{
            throw new UsernameNotFoundException("User with username: " + username + " was not found");
        }
    }
}
