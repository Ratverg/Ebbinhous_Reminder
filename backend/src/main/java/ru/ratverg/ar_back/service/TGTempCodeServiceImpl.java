package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.TGAuthCodeMapper;
import ru.ratverg.ar_back.DTO.TGUserMapper;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGAuthCode;
import ru.ratverg.ar_back.exception.AuthCodeExpiredException;
import ru.ratverg.ar_back.repository.ARUserRepository;
import ru.ratverg.ar_back.repository.TGAuthCodeRepository;
import ru.ratverg.ar_back.repository.TGUserRepository;

import java.security.SecureRandom;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TGTempCodeServiceImpl implements TGTempCodeService {

    private TGAuthCodeRepository tgAuthCodeRepository;
    private TGAuthCodeMapper tgAuthCodeMapper;
    private JwtTelegramService jwtTelegramService;
    private TGUserServiceImpl tgUserService;
    private TGUserMapper tgUserMapper;
    private TGUserRepository tgUserRepository;
    private ARUserRepository arUserRepository;

    @Autowired
    public TGTempCodeServiceImpl(TGAuthCodeRepository tgAuthCodeRepository, TGAuthCodeMapper tgAuthCodeMapper, JwtTelegramService jwtTelegramService, TGUserServiceImpl tgUserService, TGUserMapper tgUserMapper, TGUserRepository tgUserRepository, ARUserRepository arUserRepository) {
        this.tgAuthCodeRepository = tgAuthCodeRepository;
        this.tgAuthCodeMapper = tgAuthCodeMapper;
        this.jwtTelegramService = jwtTelegramService;
        this.tgUserService = tgUserService;
        this.tgUserMapper = tgUserMapper;
        this.tgUserRepository = tgUserRepository;
        this.arUserRepository = arUserRepository;
    }

    @Override
    public TGAuthCode findTGAuthCodeInDB(String authCodeTemp) {
        TGAuthCode tgAuthCode = tgAuthCodeRepository
                .findByAuthCodeTemp(authCodeTemp)
                .orElseThrow(() -> new UsernameNotFoundException("Temp auth code does not found in DB: " + authCodeTemp));
        return tgAuthCode;
    }

    @Override
    public TGAuthCode createOrUpdate (ARUser arUser, TGAuthCode newTGCode) {
        //get TGAuthCode object from DB
        TGAuthCode existingTGCode = tgAuthCodeRepository
                .findByArUser(arUser)
                .orElseGet(()->{
                    TGAuthCode temp = new TGAuthCode();
                    temp.setArUser(arUser);
                    return temp;
                });

        //update in the DB
        tgAuthCodeMapper.updateTGAuthCode(existingTGCode, newTGCode);
        return tgAuthCodeRepository.save(existingTGCode);
    }

    public String generateNewCodeString() {
        //generate random 6 digit code
        String alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
        SecureRandom secRand = new SecureRandom();
        String tempCode = secRand.ints(6, 0, alphabet.length())
                .mapToObj(x -> alphabet.charAt(x))
                .map(x->String.valueOf(x))
                .collect(Collectors.joining());
        return tempCode;
    }
    @Override
    public TGAuthCode generateNewCode(ARUser arUser, int telegramId, int chatId) {
        //get new temp code string
        String tempCode = this.generateNewCodeString();

        //create new TGAuthCode object
        TGAuthCode newTGCode = new TGAuthCode(
                arUser,
                tempCode,
                Instant.now(),
                Instant.now().plus(5,ChronoUnit.MINUTES),
                false,
                telegramId,
                chatId);

        //Create new object in DB or found and update existing
        return this.createOrUpdate(arUser, newTGCode);
    }

    @Override
    public void validateNotExpired(TGAuthCode tgAuthCode) {
        Instant timeNow = Instant.now();
        if (timeNow.isAfter(tgAuthCode.getExpiredAt())) {
            throw new AuthCodeExpiredException("Auth code expired :" + tgAuthCode.getAuthCodeTemp());
        }

    }

    @Override
    public void deleteAllExpiredCodes(){
        List<TGAuthCode> tgAuthCodeList = tgAuthCodeRepository
                .findAllExpiredCodes()
                .orElse(null);
        if (tgAuthCodeList != null) {
            tgAuthCodeList.forEach(x->tgAuthCodeRepository.delete(x));
        }
    }


    public TGAuthCode update(int targetId, TGAuthCode source) {
        TGAuthCode target = tgAuthCodeRepository
                .findById(targetId)
                .orElseThrow(() -> new UsernameNotFoundException("User not found for id: " + targetId));
        tgAuthCodeMapper.updateTGAuthCode(target, source);
        return tgAuthCodeRepository.save(target);
    }

    @Override
    public void delete(TGAuthCode tgAuthCode) {
        tgAuthCodeRepository.delete(tgAuthCode);
    }

}
