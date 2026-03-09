package ru.ratverg.ar_back.controller;

import org.springframework.http.HttpEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import ru.ratverg.ar_back.DTO.ServiceRequestDTO;
import ru.ratverg.ar_back.service.SAService;
import ru.ratverg.ar_back.service.SAServiceImpl;

@RestController
@RequestMapping("/api/service/auth")
public class ServiceAuthController {
    private SAServiceImpl saService;

    public ServiceAuthController(SAServiceImpl saService) {
        this.saService = saService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody ServiceRequestDTO requestDTO) {
        return ResponseEntity.ok().body(saService.getToken(requestDTO));
    }

    //todo refresh token later
}
