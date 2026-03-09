package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.DTO.TGHealthResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGUser;

public interface TGBotService {
//    TGUser getTGUser(ARUser arUser);

    TGHealthResponseDTO getTGHealthStatus();

    void checkStatus();
}
