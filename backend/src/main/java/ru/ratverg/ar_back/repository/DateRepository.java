package ru.ratverg.ar_back.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.entity.Notification;

import java.time.Instant;
import java.util.List;

@Repository
public interface DateRepository extends JpaRepository<Date, Integer> {

    @Query("""
            SELECT d
            FROM Date d
            JOIN d.notification n
            WHERE d.repeatDate < :thresholdTime
            AND d.sentAt IS NULL
            """)
    List<Date> findAllNotSentDatesBefore(Instant thresholdTime);

    @Query("""
            SELECT d
            FROM Date d
            JOIN d.notification n
            JOIN n.arUser u
            JOIN u.tgUser t
            WHERE d.repeatDate < :thresholdTime
            AND d.sentAt IS NULL
            AND d.status IS NULL
            AND t IS NOT NULL
            """)
    List<Date> findAllNotSentDatesWithTGUserBefore(Instant thresholdTime);
}
