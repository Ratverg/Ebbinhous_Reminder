package ru.ratverg.ar_back.service;

import ru.ratverg.ar_back.DTO.ARUserRequestDTO;
import ru.ratverg.ar_back.DTO.ARUserResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;

import java.util.List;

public interface ARUserService {
    List<ARUser> findAll();
    //    ARUserResponseDTO findARUserByID();
    //    ARUserResponseDTO saveARUser(ARUserRequestDTO arUserRequestDTO);
    void deleteARUserByID(int id);

    ARUser findARUserByID(int id);

    ARUserResponseDTO saveARUser(ARUserRequestDTO arUserRequestDTO);
}
