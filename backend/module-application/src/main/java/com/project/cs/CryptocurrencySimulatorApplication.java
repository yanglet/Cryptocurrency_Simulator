package com.project.cs;

import org.springframework.batch.core.configuration.annotation.EnableBatchProcessing;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableBatchProcessing
@EnableScheduling
@SpringBootApplication
public class CryptocurrencySimulatorApplication {
    public static void main(String[] args) {
        SpringApplication.run(CryptocurrencySimulatorApplication.class, args);
    }
}