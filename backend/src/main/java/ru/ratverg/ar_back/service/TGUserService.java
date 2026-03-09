package ru.ratverg.ar_back.service;

import org.springframework.http.ResponseEntity;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.ARUserDetails;
import ru.ratverg.ar_back.entity.TGUser;

public interface TGUserService {
    TGUser save(TGUser tgUser);
    TGUser update(int id, TGUser updatedTgUser);

    void delete(TGUser tgUser);

    TGUser findByARUser(ARUser arUser);

    TGUser deleteByARUserId(int arUserId);

    void deleteByTGId(int telegramId);

    TGUser createOrUpdate(ARUser arUser, TGUser newTGUser);

    ResponseEntity<?> getTGUserInfoByArUser(ARUser arUser);
    ResponseEntity<?> getTGUserInfoByTelegramId(int telegramId);
    ResponseEntity<?> getARUserInfoByTelegramId(int telegramId);
    ResponseEntity<?> getAllNotificationsByTelegramId(int telegramId);

    ResponseEntity<?> getTGUserInfoForCurrentUser(ARUserDetails arUserDetails);
}
