package ru.ratverg.ar_back.scheduler;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import ru.ratverg.ar_back.client.TelegramClient;
import ru.ratverg.ar_back.service.TGBotService;

@Component
public class TestScheduler {
    private final Logger log = LoggerFactory.getLogger(TestScheduler.class);
    private TelegramClient telegramClient;
    private TGBotService tgBotService;

    @Autowired
    public TestScheduler(TelegramClient telegramClient, TGBotService tgBotService) {
        this.telegramClient = telegramClient;
        this.tgBotService = tgBotService;
    }

    @Scheduled(fixedDelay = 10000)
    public void checkBotHealthStatus(){
        tgBotService.checkStatus();
    }

    @Scheduled(fixedDelay = 10000)
    public void sendAllTriggeredNotifications() {

    }

    @Scheduled(fixedDelay = 10000)
    public void sendAllNotSentMessages(){
        this.telegramClient.sendAllNotSentMessages();
    }

//    @Scheduled(fixedRate = 10000)
//    public void sendMessage() {
//        System.out.println("Test scheduled message");
//    }

//    @Scheduled(fixedRate = 10000)
//    public void telegramPing() {
//        telegramClient.testPing();
//    }
//
//    @Scheduled(fixedRate = 10000)
//    public void telegramSecuredPing() {
//        telegramClient.testPing();
//    }
//
//    @Scheduled(fixedRate = 100000)
//    public void sendTestMessageToTG() {
//        telegramClient
//                .sendMessageToTelegram(new TGMessageRequestDTO(922102960, "hello"))
//                .doOnNext(response -> log.info("TG message sent"))// activates only when there is real response
//                .subscribe();
//    }

}
