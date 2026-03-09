package ru.ratverg.ar_back.service;

import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.TGAuthCodeRequestDTO;
import ru.ratverg.ar_back.DTO.TGUserResponseDTO;

@Service
public interface TGAuthService {
    TGUserResponseDTO validateCodeAndCreateTGUser(TGAuthCodeRequestDTO requestDTO);
}
