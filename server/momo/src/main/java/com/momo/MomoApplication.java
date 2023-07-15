package com.momo;

import com.momo.config.CorsConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.context.annotation.ComponentScan;

@EnableJpaAuditing
@SpringBootApplication
@Import(CorsConfig.class)
public class MomoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MomoApplication.class, args);
    }

}
