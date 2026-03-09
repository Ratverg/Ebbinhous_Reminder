package ru.ratverg.ar_back.service;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.repository.DateRepository;

import java.time.Instant;
import java.util.List;

@Service
public class DateServiceImpl implements DateService{
    private DateRepository dateRepository;

    @Autowired
    public DateServiceImpl(DateRepository dateRepository) {
        this.dateRepository = dateRepository;
    }

    @Override
    public List<Date> findAllNotSentDatesBefore(Instant tresholdDate) {
        return dateRepository.findAllNotSentDatesBefore(tresholdDate);
    }

    @Override
    public List<Date> findAllNotSentDatesWithTGUserBefore (Instant tresholdDate) {
        return dateRepository.findAllNotSentDatesWithTGUserBefore(tresholdDate);
    }

    @Transactional
    @Override
    public void updateDateStatus(int currDateId, Instant sentAt, String status) {
        Date currDate = dateRepository.findById(currDateId)
                .orElseThrow(() -> new EntityNotFoundException("Date not found: " + currDateId));

        currDate.setStatus(status);
        currDate.setSentAt(sentAt);
    }
}
