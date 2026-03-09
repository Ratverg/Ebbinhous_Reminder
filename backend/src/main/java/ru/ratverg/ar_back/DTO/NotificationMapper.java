package ru.ratverg.ar_back.DTO;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.entity.Notification;


//IMPORTANT uses = DateMapper.class - to map dates in notification!!!!
//TODO remove uses = DateMapper.class
@Mapper  (componentModel = "spring", uses = DateMapper.class)
public interface NotificationMapper {
    Notification toEntity(NotificationRequestDTO notificationRequestDTO); //convert NotificationDTO object to entity

    NotificationResponseDTO toDTO(Notification notification);// convert Notification object to DTO

    //we skip mapping "dates" field, because we will update it manually in notificationServiceImpl in update method
    @Mapping(target = "dates", ignore = true)
    void updateFromDTO(NotificationRequestDTO notificationRequestDTO, @MappingTarget Notification entity);

}
