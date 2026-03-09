package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.entity.Date;

import java.time.Instant;
import java.util.List;

public interface DateService {
    List<Date> findAllNotSentDatesBefore(Instant tresholdDate);
    List<Date> findAllNotSentDatesWithTGUserBefore (Instant tresholdDate);

    void updateDateStatus(int currDateId, Instant sentAt, String status);
}
