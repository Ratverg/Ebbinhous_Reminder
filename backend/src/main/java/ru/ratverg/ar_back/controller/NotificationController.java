package ru.ratverg.ar_back.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import ru.ratverg.ar_back.DTO.NotificationMapper;
import ru.ratverg.ar_back.DTO.NotificationRequestDTO;
import ru.ratverg.ar_back.DTO.NotificationResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.Notification;
import ru.ratverg.ar_back.service.ARUserServiceImpl;
import ru.ratverg.ar_back.service.NotificationServiceImpl;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class NotificationController {
    private NotificationServiceImpl notificationService;
    private NotificationMapper notificationMapper;
    private ARUserServiceImpl arUserService;

    @Autowired
    public NotificationController(NotificationServiceImpl notificationService, NotificationMapper notificationMapper, ARUserServiceImpl arUserService) {
        this.notificationService = notificationService;
        this.notificationMapper = notificationMapper;
        this.arUserService = arUserService;
    }

    @GetMapping("/{id}/notifications")
    public List<NotificationResponseDTO> getAllNotificationForUserId(@PathVariable int id) {

        return notificationService.findNotificationsByArUserId(id);
    }

    @GetMapping("/{userId}/notifications/{notificationId}")
    public NotificationResponseDTO getNotificationWithIdForUserId(@PathVariable int userId, @PathVariable int notificationId) {
        //todo check userId when get notification!!!
        return notificationService.findNotificationById(notificationId);
    }

    @PostMapping("/{id}/notifications")
    public Notification saveNotification(@PathVariable int id, @RequestBody NotificationRequestDTO notificationRequestDTO) {
        //get arUser
        ARUser arUser = arUserService.findARUserByID(id);
        Notification notification = notificationMapper.toEntity(notificationRequestDTO);
        //bind "arUser" to notification
        notification.setArUser(arUser);
        //bind "notification" to all "dates"
        if (notification.getDates() != null) {
            notification.getDates().forEach(x -> x.setNotification(notification));
        }
        return notificationService.save(notification);
    }

    @PutMapping("/{userId}/notifications/{notificationId}")
    public Notification updateNotification(
            @PathVariable int userId,
            @PathVariable int notificationId,
            @RequestBody NotificationRequestDTO notificationRequestDTO) {
        return notificationService.updateNotification(notificationId, notificationRequestDTO);
    }

    @DeleteMapping("/{userId}/notifications/{notificationId}")
    public void deleteNotification(
            @PathVariable("userId") int userId,
            @PathVariable("notificationId") int notificationId) {
            notificationService.deleteNotification(notificationId);
    }
}
