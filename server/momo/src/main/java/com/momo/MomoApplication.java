package com.momo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.context.annotation.ComponentScan;

@EnableJpaAuditing
@SpringBootApplication
public class MomoApplication {

    public static void main(String[] args) {
        SpringApplication.run(MomoApplication.class, args);
    }

}
//package com.momo;
//
//import com.momo.category.mapper.CategoryMapper;
//import org.springframework.boot.SpringApplication;
//import org.springframework.boot.autoconfigure.SpringBootApplication;
//import org.springframework.context.ConfigurableApplicationContext;
//
//@SpringBootApplication
//public class MomoApplication {
//
//    public static void main(String[] args) {
//        ConfigurableApplicationContext context = SpringApplication.run(MomoApplication.class, args);
//
//        // CategoryMapper 빈 확인
//        CategoryMapper categoryMapper = context.getBean(CategoryMapper.class);
//        System.out.println("CategoryMapper bean: " + categoryMapper);
//    }
//
//}