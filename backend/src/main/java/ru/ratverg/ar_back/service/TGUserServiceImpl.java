package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ratverg.ar_back.DTO.ARUserMapper;
import ru.ratverg.ar_back.DTO.NotificationResponseDTO;
import ru.ratverg.ar_back.DTO.TGUserMapper;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.ARUserDetails;
import ru.ratverg.ar_back.entity.TGUser;
import ru.ratverg.ar_back.exception.TGUserNotFoundException;
import ru.ratverg.ar_back.repository.ARUserRepository;
import ru.ratverg.ar_back.repository.TGUserRepository;

import java.util.List;

@Service
public class TGUserServiceImpl implements TGUserService{

    private TGUserRepository tgUserRepository;
    private TGUserMapper tgUserMapper;
    private ARUserServiceImpl arUserService;
    private ARUserMapper arUserMapper;
    private ARUserRepository arUserRepository;
    private NotificationServiceImpl notificationService;


    @Autowired
    public TGUserServiceImpl(TGUserRepository tgUserRepository, TGUserMapper tgUserMapper, ARUserServiceImpl arUserService, ARUserMapper arUserMapper, ARUserRepository arUserRepository, NotificationServiceImpl notificationService) {
        this.tgUserRepository = tgUserRepository;
        this.tgUserMapper = tgUserMapper;
        this.arUserService = arUserService;
        this.arUserMapper = arUserMapper;
        this.arUserRepository = arUserRepository;
        this.notificationService = notificationService;
    }

    @Override
    public TGUser save(TGUser tgUser) {
        return tgUserRepository.save(tgUser);
    }

    @Override
    public TGUser update(int id, TGUser updatedTgUser) {
        TGUser tgUser = tgUserRepository
                .findById(id)
                .orElseThrow(()-> new UsernameNotFoundException("TGUser for id not found: " + id));
        return null;
    }

    @Override
    public void delete(TGUser tgUser) {
        tgUserRepository.delete(tgUser);
    }

    @Transactional
    @Override
    public void deleteByTGId(int telegramId) {
        //we will use DDD pattern ("root" will rule it's parents):
        // - find tgUser by telegramId
        // - find arUser by telegramId
        // - set arUser.tgUser(null)
        TGUser tgUser = tgUserRepository
                .findByTelegramId(telegramId)
                .orElseThrow(() -> new TGUserNotFoundException("TG user not found for telegram ID : " + telegramId));
        ARUser arUser = tgUser.getArUser();
        arUser.setTgUser(null);
    }

    @Override
    public TGUser findByARUser(ARUser arUser) {
        return tgUserRepository
                .findByArUser(arUser)
                .orElseThrow(() -> new TGUserNotFoundException("TG User not found for user: " + arUser.getUsername()));
    }

    @Transactional
    @Override
    public TGUser deleteByARUserId(int arUserId) {
        ARUser arUser = arUserRepository
                .findById(arUserId)
                .orElseThrow(()-> new UsernameNotFoundException("User not found for id: " + arUserId));
        TGUser tgUser = this.findByARUser(arUser);
        //"orphanRemoval = true" in ARUser entity, so all "orphans" will be deleted automatically
        arUser.setTgUser(null);
        System.out.println(tgUser.getTgUsername());
        return tgUser;
    }

    @Override
    public TGUser createOrUpdate(ARUser arUser, TGUser newTGUser) {
        //Found existing TGUser in DB, if none - create new
        TGUser existingTGUser = tgUserRepository
                .findByArUser(arUser)
                .orElseGet(() -> {
                    TGUser emptyTGUser = new TGUser();
                    emptyTGUser.setArUser(arUser);
                    return emptyTGUser;
                });
        //Update user with fresh info
        tgUserMapper.updateTGUser(existingTGUser, newTGUser);
        return tgUserRepository.save(existingTGUser);
    }

//    @Override
//    public ResponseEntity<?> getTGUserInfoByArUser(ARUser arUser) {
//        TGUser tgUser = tgUserRepository
//                .findByArUser(arUser)
//                .orElseThrow(()->new TGUserNotFoundException("TG User not found for ARUser with id : " + arUser.getId()));
//        return ResponseEntity.ok(tgUserMapper.toDTO(tgUser));
//    }

    @Override
    public ResponseEntity<?> getTGUserInfoByArUser(ARUser arUser) {
        return tgUserRepository.findByArUser(arUser)
                .map(user -> ResponseEntity.ok(tgUserMapper.toDTO(user)))
                .orElse(ResponseEntity.noContent().build());
    }

    @Override
    public ResponseEntity<?> getTGUserInfoByTelegramId(int telegramId) {
        TGUser tgUser = tgUserRepository
                .findByTelegramId(telegramId)
                .orElseThrow(()->new TGUserNotFoundException("TG User not found for telegram id : " + telegramId));
        return ResponseEntity.ok(tgUserMapper.toDTO(tgUser));
    }

    @Override
    public ResponseEntity<?> getARUserInfoByTelegramId(int telegramId) {
        TGUser tgUser = tgUserRepository
                .findByTelegramId(telegramId)
                .orElseThrow(()->new TGUserNotFoundException("TG User not found for telegram id : " + telegramId));
        ARUser arUser = tgUser.getArUser();
        return ResponseEntity.ok(arUserMapper.toDTO(arUser));
    }

    @Override
    public ResponseEntity<?> getAllNotificationsByTelegramId(int telegramId) {
        TGUser tgUser = tgUserRepository
                .findByTelegramId(telegramId)
                .orElseThrow(()->new TGUserNotFoundException("TG User not found for telegram id : " + telegramId));
        ARUser arUser = tgUser.getArUser();
        List<NotificationResponseDTO> notificationsResponseDTOList = notificationService.findNotificationsByArUserId(arUser.getId());
        return ResponseEntity.ok(notificationsResponseDTOList);
    }


    @Override
    public ResponseEntity<?> getTGUserInfoForCurrentUser(@AuthenticationPrincipal ARUserDetails arUserDetails) {
        // If no user is not authenticated, return 403 FORBIDDEN
        if (arUserDetails == null) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(null);
        }
        // get current ARUser if arUserDetails != null
        ARUser currentARUser = arUserDetails.getARUser();
        //get user info for current user
        return getTGUserInfoByArUser(currentARUser);
    }
}
