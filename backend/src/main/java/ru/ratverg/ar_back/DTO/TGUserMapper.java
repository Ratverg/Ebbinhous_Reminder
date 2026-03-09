package ru.ratverg.ar_back.DTO;

import org.mapstruct.*;
import ru.ratverg.ar_back.entity.TGUser;

@Mapper(componentModel = "spring")
public interface TGUserMapper {

    TGUser toEntity(TGUserRequestDTO tgUserRequestDTO);

    TGUserResponseDTO toDTO(TGUser tgUser);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateTGUser(@MappingTarget TGUser target, TGUser source);
}
