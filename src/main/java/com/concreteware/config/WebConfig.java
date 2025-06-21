package com.concreteware.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cambia esto según tus necesidades
                .allowedOriginPatterns("*")         // O pon sólo tu origen: http://localhost:54263
                .allowedMethods("GET","POST","PUT","DELETE")
                .allowedHeaders("*")         // O especifica los headers permitidos
                .allowCredentials(true);
    }
}
