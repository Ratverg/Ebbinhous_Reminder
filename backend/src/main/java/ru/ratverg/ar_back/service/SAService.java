package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.DTO.ServiceRequestDTO;
import ru.ratverg.ar_back.DTO.ServiceResponceDTO;

public interface SAService {
    //recieve request with "secret", send "JWT" back
    ServiceResponceDTO getToken(ServiceRequestDTO requestDTO);
}
