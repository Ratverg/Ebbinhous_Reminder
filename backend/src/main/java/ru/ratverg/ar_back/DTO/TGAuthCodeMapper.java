package ru.ratverg.ar_back.DTO;

import org.mapstruct.*;
import ru.ratverg.ar_back.entity.TGAuthCode;

@Mapper(componentModel = "spring")
public interface TGAuthCodeMapper{
    TGAuthCode toEntity(TGAuthCodeRequestDTO requestDTO);

    TGAuthCodeResponseDTO toDTO(TGAuthCode authCode);

    //IGNORE - do not update target fields, if source fields are "null"
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    void updateTGAuthCode(@MappingTarget TGAuthCode target, TGAuthCode source);
}
