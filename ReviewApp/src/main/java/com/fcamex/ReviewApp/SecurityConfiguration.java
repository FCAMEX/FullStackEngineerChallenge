package com.fcamex.ReviewApp;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.password.NoOpPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.core.userdetails.UserDetailsService;

@EnableWebSecurity
public class SecurityConfiguration extends WebSecurityConfigurerAdapter {

    @Autowired
    MyUserDetailsService userDetailService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception{
        auth.userDetailsService(userDetailService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception{

        http.headers().disable();
        http.csrf().disable();

       //http.authorizeRequests().anyRequest().permitAll();

        http.authorizeRequests()
                .antMatchers("/employees").hasRole("ADMIN")
                .antMatchers("/employees/**").hasRole("ADMIN")
                .antMatchers("/reviews/**").hasRole("ADMIN")
                .antMatchers("/review/**").hasRole("ADMIN")
                .antMatchers("/employee_reviews/**").hasRole("USER")
                .antMatchers("/feedback/**").hasRole("USER")
                .antMatchers("/").hasAnyRole("ADMIN", "USER")
                .and().formLogin()
                .successHandler(new CustomSuccessHandler())
        .and().logout().logoutUrl("/logout").logoutSuccessUrl("/login")
        ;

    }

    @Bean
    public PasswordEncoder getPasswordEncoder() { return NoOpPasswordEncoder.getInstance();
    }

}
