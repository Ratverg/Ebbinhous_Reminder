package ru.ratverg.ar_back.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.TGHealthResponseDTO;
import ru.ratverg.ar_back.client.TelegramClient;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGUser;

@Service
public class TGBotServiceIml implements TGBotService{
    private final Logger log = LoggerFactory.getLogger(TGBotServiceIml.class);
    private TelegramClient telegramClient;
    private volatile TGHealthResponseDTO botHealthStatus = new TGHealthResponseDTO(false);
    private ARUserServiceImpl arUserService;
    private TGAuthServiceImpl tgAuthService;

    @Autowired
    public TGBotServiceIml(TelegramClient telegramClient, ARUserServiceImpl arUserService, TGAuthServiceImpl tgAuthService) {
        this.telegramClient = telegramClient;
        this.arUserService = arUserService;
        this.tgAuthService = tgAuthService;
    }


    public void checkStatus(){
        telegramClient
            .getTGBotHealthStatus()
            .subscribe(
                    response -> {
                        log.info("TG Bot health status: {}", response.isBotOnline());
                        this.botHealthStatus = new TGHealthResponseDTO(response.isBotOnline());
                    },
                    error -> {
                        log.error("TG Bot offline. Reason: {}", error.getMessage());
                        this.botHealthStatus = new TGHealthResponseDTO(false);
                    }
            );//we need to subscribe to "activate" this method,  fire-and-forget execution
    }

    @Override
    public TGHealthResponseDTO getTGHealthStatus() {
        return this.botHealthStatus;
    }
}
