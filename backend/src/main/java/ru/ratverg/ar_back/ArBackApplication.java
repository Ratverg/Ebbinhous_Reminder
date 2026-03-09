package ru.ratverg.ar_back;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@SpringBootApplication
public class ArBackApplication {

	public static void main(String[] args) {
		SpringApplication.run(ArBackApplication.class, args);
	}

}
