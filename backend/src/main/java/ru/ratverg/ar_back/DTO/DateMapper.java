package ru.ratverg.ar_back.DTO;

import org.mapstruct.Mapper;
import ru.ratverg.ar_back.entity.Date;

@Mapper (componentModel = "spring")
public interface DateMapper {
    Date toEntity(DateRequestDTO dateRequestDTO);

    DateResponseDTO toDTO(Date date);
}
