package ru.ratverg.ar_back.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import ru.ratverg.ar_back.DTO.TGMessageRequestDTO;
import ru.ratverg.ar_back.DTO.TGMessageResponseDTO;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.entity.Notification;
import ru.ratverg.ar_back.repository.DateRepository;
import ru.ratverg.ar_back.scheduler.TestScheduler;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

@Service
public class TGSenderServiceImpl implements TGSenderService {
    private final Logger log = LoggerFactory.getLogger(TGSenderServiceImpl.class);
    private DateRepository dateRepository;
    private WebClient webClient;
    private DateServiceImpl dateService;
    @Value("${TELEGRAM_BOT_NAME}")
    private String tgBotName;
    @Autowired
    public TGSenderServiceImpl(DateRepository dateRepository, WebClient webClient, DateServiceImpl dateService) {
        this.dateRepository = dateRepository;
        this.webClient = webClient;
        this.dateService = dateService;
    }

//    public String formTextMessage(int dateId) {
//        Date currDate = dateRepository
//                .findById(dateId)
//                .orElseThrow(() -> new RuntimeException("Date not found for id: " + dateId));
//        String formattedDate = DateTimeFormatter
//                .ofPattern("yyyy-MM-dd HH:mm:ss")
//                .withZone(ZoneId.systemDefault())
//                .format(currDate.getRepeatDate());
//        Notification currNotification = currDate.getNotification();
//        String currTitle = currNotification.getTitle();
//        String currHash = currNotification.getHashTag();
//        return "%s : %s : %s".formatted(formattedDate, currTitle, currHash);
//    }

    public String formTextMessage(int dateId) {
        Date currDate = dateRepository
                .findById(dateId)
                .orElseThrow(() -> new RuntimeException("Date not found for id: " + dateId));

        Notification currNotification = currDate.getNotification();

        String title = currNotification.getTitle();

        // Формат даты как в Python-версии
        ZoneId zone = ZoneId.systemDefault();

        DateTimeFormatter formatter = DateTimeFormatter
                .ofPattern("d MMM yyyy - HH'ч.' mm'мин.'")
                .withZone(zone);

        String formattedDate = formatter.format(currDate.getRepeatDate());

        // Telegram HTML formatting
        return "<b>" + title + "</b>\n" +
                "<code>" + formattedDate + "</code>";
    }


    @Async
    @Override
    public void sendSingleNotificationMessageAsync(int dateId) {
        try {
            //get chatId
            Date currDate = dateRepository
                    .findById(dateId)
                    .orElseThrow(() -> new RuntimeException("Date not found for id: " + dateId));
            //get chatId
            int chatId = currDate.getNotification().getArUser().getTgUser().getChatId();
            //forming TGRequestDTO
            String tgMessageText = this.formTextMessage(dateId);
            TGMessageRequestDTO tgMessageRequestDTO = new TGMessageRequestDTO(chatId, tgMessageText);
            //send message to Telegram with WebClient
            TGMessageResponseDTO tgMessageResponseDTO = webClient
                    .post()
                    .uri(tgBotName +":8000/send-message")
                    .contentType(MediaType.APPLICATION_JSON)
                    .bodyValue(tgMessageRequestDTO)
                    .retrieve()// send request and handle HTTP status
                    .onStatus(status -> status.isError(),
                            clientResponse -> clientResponse
                                    .bodyToMono(String.class)
                                    .map(body -> new RuntimeException(body)))
                    .bodyToMono(TGMessageResponseDTO.class)//convert to mono
                    .block();
            if (tgMessageResponseDTO.isOk()) dateService.updateDateStatus(dateId, Instant.now(), "sent");
        } catch (Exception e) {
            System.out.println("Error, while sending TG message :" + e.getMessage());
            dateService.updateDateStatus(dateId, null, e.getMessage());
        }
    }
}
