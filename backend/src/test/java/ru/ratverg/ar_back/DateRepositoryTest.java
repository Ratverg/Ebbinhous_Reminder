package ru.ratverg.ar_back;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.repository.DateRepository;

import java.time.Instant;
import java.util.List;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class DateRepositoryTest {
    @Autowired
    private DateRepository dateRepository;

    @Test
    void contextLoad(){
        assertThat(dateRepository).isNotNull();
    }

    @Test
    @Rollback(true)
    @Transactional
    void basicCRUDtest(){
//        Date newDate = new Date(null, Instant.now());
//        dateRepository.save(newDate);
//        List<Date> allDates = dateRepository.findAllDatesBefore(Instant.now());
//        List<Notification> allNotifications = dateRepository.findAllNotSentNotificationBefore(Instant.now());
//        allNotifications.forEach(x-> System.out.println(x.getTitle()));
//        List<Date> allNotSentDates = dateRepository.findAllNotSentDatesBefore(Instant.now());
        List<Date> allNotSentDates = dateRepository.findAllNotSentDatesWithTGUserBefore(Instant.now());
        allNotSentDates.forEach(x->{
            System.out.println("%s : %s : %s".formatted(x.getRepeatDate(),x.getNotification().getTitle(), x.getSentAt()));
        });
    }
}
