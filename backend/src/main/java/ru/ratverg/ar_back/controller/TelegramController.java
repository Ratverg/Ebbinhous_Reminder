package ru.ratverg.ar_back.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import ru.ratverg.ar_back.DTO.TGAuthCodeRequestDTO;
import ru.ratverg.ar_back.DTO.TGMessageRequestDTO;
import ru.ratverg.ar_back.DTO.TGUserResponseDTO;
import ru.ratverg.ar_back.client.TelegramClient;
import ru.ratverg.ar_back.scheduler.TestScheduler;
import ru.ratverg.ar_back.security.JWTPrincipals.TelegramJwtPayload;
import ru.ratverg.ar_back.service.*;

import java.util.Map;

@RestController
@RequestMapping("/api/service/telegram")
public class TelegramController {
    private final Logger log = LoggerFactory.getLogger(TestScheduler.class);
    private TGTempCodeServiceImpl tgTempCodeService;
    private TGAuthServiceImpl tgAuthService;
    private TelegramClient telegramClient;
    private ObjectMapper mapper;
    private TGUserServiceImpl tgUserService;

    @Autowired
    public TelegramController(TGTempCodeServiceImpl tgTempCodeService, TGAuthServiceImpl tgAuthService, TelegramClient telegramClient, ObjectMapper mapper, TGUserServiceImpl tgUserService) {
        this.tgTempCodeService = tgTempCodeService;
        this.tgAuthService = tgAuthService;
        this.telegramClient = telegramClient;
        this.mapper = mapper;
        this.tgUserService = tgUserService;
    }

    @GetMapping("/about")
    public Map<String, String> test (){
        return Map.of("version", "0.001", "author", "ratverg");
    }

    @GetMapping("/telegram-id")
    public Map<String, Integer> telegramId (@RequestBody TelegramJwtPayload payload){
        return Map.of("telegramId", payload.getTelegramId(), "userId", payload.getUserId() );
    }

    @GetMapping ("/delete-all-expired-codes")
    public void deleteAllExpiredCodes (){
        tgTempCodeService.deleteAllExpiredCodes();
    }

    @GetMapping("/tg-user-info/{telegramId}")
    public ResponseEntity<?> getTgUserInfo(@PathVariable int telegramId) {
        return tgUserService.getTGUserInfoByTelegramId(telegramId);
    }

    @GetMapping("/ar-user-info/{telegramId}")
    public ResponseEntity<?> getArUserInfo(@PathVariable int telegramId) {
        return tgUserService.getARUserInfoByTelegramId(telegramId);
    }

    @GetMapping("/all-notifications/{telegramId}")
    public ResponseEntity<?> getAllNotifications(@PathVariable int telegramId) {
        return tgUserService.getAllNotificationsByTelegramId(telegramId);
    }

    @DeleteMapping("/unlink-tg-user/{telegramId}")
    public ResponseEntity<?> deleteTGUser(@PathVariable int telegramId) {
        tgUserService.deleteByTGId(telegramId);
        return ResponseEntity.noContent().build(); //returns status 204
    }

    @PostMapping("/validate-code")
    public ResponseEntity<?> validateCodeAndCreateTGUser(@RequestBody TGAuthCodeRequestDTO tgAuthCodeRequestDTO) throws JsonProcessingException {
        try {
            TGUserResponseDTO tgUserResponseDTO = tgAuthService.validateCodeAndCreateTGUser(tgAuthCodeRequestDTO);
            telegramClient
                    .sendMessageToTelegram(
                            new TGMessageRequestDTO(
                                    tgUserResponseDTO.getChatId(),
                                    "Back: created TGUser = " + mapper.writeValueAsString(tgUserResponseDTO))
                    )
                    .doOnNext(response -> log.info("tgUser Created, TG message sent correctly"))// activates only when there is real response
                    .doOnError(error -> log.warn("tgUser Created, TG message sent failed", error))
                    .subscribe();//we need to subscribe to "activate" this method,  fire-and-forget execution
            return ResponseEntity.ok(tgUserResponseDTO);
        } catch (Exception e) {
            telegramClient
                    .sendMessageToTelegram(
                            new TGMessageRequestDTO(
                                    tgAuthCodeRequestDTO.getChatId(),
                                    "Back: error = " + e.getMessage())
                    )
                    .doOnNext(response -> log.info("tgUser Created failed, TG message sent correctly"))// activates only when there is real response
                    .doOnError(error -> log.warn("tgUser Created failed, TG message sent failed", error))
                    .subscribe();//we need to subscribe to "activate" this method,  fire-and-forget execution
            System.out.println(e.getMessage());
            throw e; //thow error again to upper level
        }
    }
}
