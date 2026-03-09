package ru.ratverg.ar_back;


import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import ru.ratverg.ar_back.client.TelegramClient;

@SpringBootTest
public class ServicesTests {

    @Autowired
    private TelegramClient telegramClient;

    @Test
    public void sendAllNotSentMessages() throws InterruptedException {
        this.telegramClient.sendAllNotSentMessages();
        Thread.sleep(10000);
    }
}
