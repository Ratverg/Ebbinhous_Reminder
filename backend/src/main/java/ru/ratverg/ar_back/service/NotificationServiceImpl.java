package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ru.ratverg.ar_back.DTO.DateMapper;
import ru.ratverg.ar_back.DTO.NotificationMapper;
import ru.ratverg.ar_back.DTO.NotificationRequestDTO;
import ru.ratverg.ar_back.DTO.NotificationResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.Date;
import ru.ratverg.ar_back.entity.Notification;
import ru.ratverg.ar_back.exception.NotificationNotFoundException;
import ru.ratverg.ar_back.repository.NotificationRepository;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NotificationServiceImpl implements NotificationService{

    private ARUserService arUserService;
    private NotificationRepository notificationRepository;
    private NotificationMapper notificationMapper;
    private DateMapper dateMapper;
    @Autowired
    public NotificationServiceImpl(ARUserService arUserService, NotificationRepository notificationRepository, NotificationMapper notificationMapper, DateMapper dateMapper) {
        this.arUserService = arUserService;
        this.notificationRepository = notificationRepository;
        this.notificationMapper = notificationMapper;
        this.dateMapper = dateMapper;
    }

    @Override
    public List<NotificationResponseDTO> findNotificationsByArUserId(int id) {
        ARUser arUser = arUserService.findARUserByID(id); //temp set to 1
//        System.out.println(notificationRepository.findNotificationsByArUser(arUser));
        return notificationRepository.findNotificationsByArUser(arUser)
                .stream().map(x-> {
                    System.out.println(x.getTitle());
                    return notificationMapper.toDTO(x);
                })
                .collect(Collectors.toList());
    }
    @Override
    public NotificationResponseDTO findNotificationById(int notificationId) {
        Notification tempNotification =  notificationRepository
                .findById(notificationId)
                .orElseThrow(() -> new NotificationNotFoundException("Notification with not found for ID : " + notificationId));
        return notificationMapper.toDTO(tempNotification);
    }

    @Override
    public Notification save(Notification notification) {
        return notificationRepository.save(notification);
    }

    @Override
    @Transactional
    public Notification updateNotification(int id, NotificationRequestDTO notificationRequestDTO) {

        //1. get  Notification entity "existing" by it's ID
        //2. clear existing ".dates" list of "existing" (orphanedRemoval=true, CascadeTyte.all in Notification entity)
        //3. create new "Date entity" and attach them to "existing"
        //4. return this updated notification

        //get existing notification by id
        //Notification existing = notificationRepository.findById(id)
        //.orElseThrow(() -> new RuntimeException("Notification not found"));

        //get existing with WRITE lock, using custom method
        Notification existing = notificationRepository.findByIdWIthBLock(id)
                .orElseThrow(() -> new RuntimeException("Notification not found"));
        //update all simple fields (except "dates") of the existing notification  with info from the requestDTO
        notificationMapper.updateFromDTO(notificationRequestDTO, existing);

        //delete old existing  dates in our existing notification ("@orphanRemoval = true" in our notification entity will remove them from DB)
        existing.getDates().clear();

        //1. Create new List, by get dateList from notificationRequestDTO
        //2. map all "dates" from this List to Date object
        //3. set field ".setNotification" to connect Date to notification
        if (notificationRequestDTO.getDates() != null && !notificationRequestDTO.getDates().isEmpty()) {
            List<Date> dates = notificationRequestDTO.getDates()
                    .stream()
                    .map(dateDTO->{
                        Date date = dateMapper.toEntity(dateDTO);
                        date.setId(0);// SET notification dates to 0
                        System.out.println(date.getStatus());
                        date.setNotification(existing); //binding to "existing" notification (IMPORTANT!)
                        return date;
                    })
                    .collect(Collectors.toList());
            //add all dates to existing notification
            existing.getDates().addAll(dates);
        }
        //save updated notification and return it
        return notificationRepository.save(existing);
    }

    @Override
    public void deleteNotification(int id) {
        notificationRepository.deleteById(id);
    }

}
