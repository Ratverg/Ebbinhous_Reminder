package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ratverg.ar_back.DTO.TGAuthCodeRequestDTO;
import ru.ratverg.ar_back.DTO.TGUserMapper;
import ru.ratverg.ar_back.DTO.TGUserResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.TGAuthCode;
import ru.ratverg.ar_back.entity.TGUser;
import ru.ratverg.ar_back.repository.TGAuthCodeRepository;
import ru.ratverg.ar_back.repository.TGUserRepository;

@Service
public class TGAuthServiceImpl implements TGAuthService {
    TGAuthCodeRepository tgAuthCodeRepository;
    TGTempCodeServiceImpl tgTempCodeService;
    JwtTelegramService jwtTelegramService;
    TGUserRepository tgUserRepository;
    TGUserMapper tgUserMapper;
    TGUserServiceImpl tgUserService;

    @Autowired
    public TGAuthServiceImpl(TGAuthCodeRepository tgAuthCodeRepository, TGTempCodeServiceImpl tgTempCodeService, JwtTelegramService jwtTelegramService, TGUserRepository tgUserRepository, TGUserMapper tgUserMapper, TGUserServiceImpl tgUserService) {
        this.tgAuthCodeRepository = tgAuthCodeRepository;
        this.tgTempCodeService = tgTempCodeService;
        this.jwtTelegramService = jwtTelegramService;
        this.tgUserRepository = tgUserRepository;
        this.tgUserMapper = tgUserMapper;
        this.tgUserService = tgUserService;
    }

    @Override
    @Transactional
    public TGUserResponseDTO validateCodeAndCreateTGUser(TGAuthCodeRequestDTO requestDTO) {

        //Found code object in DB
        String tgAuthCodeTemp = requestDTO.getAuthCodeTemp();
        TGAuthCode tgAuthCode = tgTempCodeService.findTGAuthCodeInDB(tgAuthCodeTemp);

        //Validate code expiration date
        tgTempCodeService.validateNotExpired(tgAuthCode);

        //Create new TGUser with fresh info
        ARUser arUser = tgAuthCode.getArUser();
        int telegramId = requestDTO.getTelegramId();
        int chatId = requestDTO.getChatId();
        String tgUsername = requestDTO.getTgUsername();

        //Checks are TGUsers with this telegramID already exists, if yes - delete them
        //(yes, deleting is by using "orphanremoval=true" property as setting ref to null)
        tgUserRepository
                .findAllByTelegramId(telegramId)
                .ifPresent((tgUsers)-> tgUsers.forEach(tempTGUser->{
                    ARUser tempARUser = tempTGUser.getArUser();
                    tempARUser.setTgUser(null);
                }));

        TGUser newTGUser = new TGUser(arUser, telegramId, tgAuthCodeTemp, chatId, tgUsername);

        //Found existing TGUser in DB, if none - create new
        TGUser updatedTGUser = tgUserService.createOrUpdate(arUser, newTGUser);

        //Delete TGAuthCode object from DB (we do not need it anymore)
        //tgTempCodeService.delete(tgAuthCode); //this does not work!!! because we have oneToOne
        arUser.setTgAuthCode(null); //this will work because orphanRemoval = true

        //Convert to DTO
        TGUserResponseDTO updatedTGUserResponseDTO = tgUserMapper.toDTO(updatedTGUser);

        return updatedTGUserResponseDTO;
    }
}
