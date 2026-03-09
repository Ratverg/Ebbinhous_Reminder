package ru.ratverg.ar_back.client;

import com.fasterxml.jackson.databind.JsonNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import ru.ratverg.ar_back.DTO.TGHealthResponseDTO;
import ru.ratverg.ar_back.DTO.TGMessageRequestDTO;
import ru.ratverg.ar_back.DTO.TGMessageResponseDTO;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.scheduler.TestScheduler;
import ru.ratverg.ar_back.service.TGSenderService;
import ru.ratverg.ar_back.service.TGSenderServiceImpl;
import ru.ratverg.ar_back.service.DateServiceImpl;

import java.time.Instant;
import java.util.List;

@Component
public class TelegramClient {
    private final Logger log = LoggerFactory.getLogger(TestScheduler.class);
    private WebClient webClient;
    private DateServiceImpl dateService;
    private TGSenderService tgSenderService;
    @Value("${TELEGRAM_BOT_NAME}")
    private String tgBotName;

    @Autowired
    public TelegramClient(WebClient webClient, DateServiceImpl dateService, TGSenderService tgSenderService) {
        this.webClient = webClient;
        this.dateService = dateService;
        this.tgSenderService = tgSenderService;
    }

    public void testPing(){
        Mono<JsonNode> mono =  webClient.get()
                .uri(tgBotName +"/test")
                .retrieve()
                .bodyToMono(JsonNode.class);
        mono.subscribe(json -> {
                    System.out.println(json.toString());
                },
                error -> {
                    System.out.println(error.getMessage());
                });
    }

    public void securedTestPing(){
        //get "mono" with JSON body
        Mono<JsonNode> mono = webClient.get()
                .uri(tgBotName +"/secured-test")
                .retrieve()
                .bodyToMono(JsonNode.class);
        //decode this JSON body
        mono.subscribe(json -> {
                    System.out.println(json.toString());
                },
                error -> {
                    System.out.println(error.getMessage());
                });
    }

    //send message to telegram
    public Mono<TGMessageResponseDTO> sendMessageToTelegram(TGMessageRequestDTO tgMessageRequest) {
        //returns "Mono" object - container for the "response"
        //later we can do "mono.subscribe(json->sout(json.toString()))" - we subscribe to the things it the container.
        return webClient.post()
                .uri(tgBotName +"/send-message")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(tgMessageRequest)
                .retrieve()// send request and handle HTTP status
                .bodyToMono(TGMessageResponseDTO.class)//convert to mono
                ;
    }

    public Mono<TGHealthResponseDTO> getTGBotHealthStatus(){
        return webClient.get()
                .uri(tgBotName + "/health")
                .retrieve()
                .bodyToMono(TGHealthResponseDTO.class)
                ;
    }

    public void sendAllNotSentMessages(){
        List<Date> allNotSentDates = dateService.findAllNotSentDatesWithTGUserBefore(Instant.now());
        allNotSentDates.forEach(currDate -> tgSenderService.sendSingleNotificationMessageAsync(currDate.getId()));
    }
}
