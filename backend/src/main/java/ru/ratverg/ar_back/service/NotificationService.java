package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.DTO.NotificationRequestDTO;
import ru.ratverg.ar_back.DTO.NotificationResponseDTO;
import ru.ratverg.ar_back.entity.Notification;

import java.util.List;

public interface NotificationService {
    List<NotificationResponseDTO> findNotificationsByArUserId(int id);

    Notification save(Notification notification);

    Notification updateNotification(int id, NotificationRequestDTO notificationRequestDTO);

    void deleteNotification(int id);

    NotificationResponseDTO findNotificationById(int notificationId);

}
