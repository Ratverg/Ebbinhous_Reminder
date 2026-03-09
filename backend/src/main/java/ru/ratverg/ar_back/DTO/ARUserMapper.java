package ru.ratverg.ar_back.DTO;

import org.hibernate.bytecode.enhance.internal.bytebuddy.ModelTypePool;
import org.mapstruct.Mapper;
import ru.ratverg.ar_back.entity.ARUser;

@Mapper (componentModel = "spring")
public interface ARUserMapper {
    ARUser toEntity(ARUserRequestDTO arUserRequestDTO); //convert ARUserDTO object to entity

    ARUserResponseDTO toDTO(ARUser arUser);// convert ARUser object to DTO
}
