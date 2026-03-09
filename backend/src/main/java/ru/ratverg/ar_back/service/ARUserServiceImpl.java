package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.ARUserMapper;
import ru.ratverg.ar_back.DTO.ARUserRequestDTO;
import ru.ratverg.ar_back.DTO.ARUserResponseDTO;
import ru.ratverg.ar_back.entity.ARUser;
import ru.ratverg.ar_back.repository.ARUserRepository;

import java.util.List;

@Service
public class ARUserServiceImpl implements ARUserService {

    //insert repository bean
    private ARUserRepository arUserRepository;
    private ARUserMapper arUserMapper;
    private PasswordEncoder passwordEncoder;

    @Autowired
    public ARUserServiceImpl(ARUserRepository arUserRepository, ARUserMapper arUserMapper, PasswordEncoder passwordEncoder) {
        this.arUserRepository = arUserRepository;
        this.arUserMapper = arUserMapper;
        this.passwordEncoder = passwordEncoder;
    }

    //Create DAO methods

    @Override
    public List<ARUser> findAll() {
        return arUserRepository.findAll();
    }

    @Override
    public void deleteARUserByID(int id) {
        arUserRepository.deleteById(id);
    }

    @Override
    public ARUser findARUserByID(int id) {
        return arUserRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("user not found for id: " + id));
    }

    //creates new full ARUser object (based on ARUserRequestDTO) and returns ResponseDTO
    @Override
    public ARUserResponseDTO saveARUser(ARUserRequestDTO arUserRequestDTO) {
        //cast to entity
        ARUser entity = arUserMapper.toEntity(arUserRequestDTO);
        //encode password and put it to entity
        entity.setPassword(passwordEncoder.encode(arUserRequestDTO.getPassword()));
        //save to entity, and returns saved entity
        ARUser saved = arUserRepository.save(entity);
        //return DTO
        return arUserMapper.toDTO(saved);
    }
}
