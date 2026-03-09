package ru.ratverg.ar_back.exception;

import ru.ratverg.ar_back.DTO.ServiceRequestDTO;

public class ServiceAccountNotFoundException extends RuntimeException{
    public ServiceAccountNotFoundException(String message) {
        super(message);
    }
}
