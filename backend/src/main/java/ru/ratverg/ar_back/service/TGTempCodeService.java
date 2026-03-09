package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.DTO.TGAuthCodeRequestDTO;
import ru.ratverg.ar_back.DTO.TGUserResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGAuthCode;

public interface TGTempCodeService {
    TGAuthCode findTGAuthCodeInDB(String authCode);

    TGAuthCode generateNewCode(ARUser arUser, int telegramId, int chatId);

//    boolean validateAndDeleteCode(String authCodeTemp);

    void deleteAllExpiredCodes();

    TGAuthCode update(int targetId, TGAuthCode source);

    void delete(TGAuthCode tgAuthCode);

    TGAuthCode createOrUpdate(ARUser arUser, TGAuthCode newTGCode);

    void validateNotExpired(TGAuthCode tgAuthCode);

    String generateNewCodeString();


}
