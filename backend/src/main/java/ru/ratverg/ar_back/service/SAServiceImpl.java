package ru.ratverg.ar_back.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.JWTtokenDTO;
import ru.ratverg.ar_back.DTO.ServiceRequestDTO;
import ru.ratverg.ar_back.DTO.ServiceResponceDTO;
import ru.ratverg.ar_back.entity.ServiceAccount;
import ru.ratverg.ar_back.exception.AuthCodeException;
import ru.ratverg.ar_back.exception.ServiceAccountNotFoundException;
import ru.ratverg.ar_back.repository.SARepository;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SAServiceImpl implements SAService {
    private PasswordEncoder passwordEncoder;
    private SARepository saRepository;
    private JWTMainService jwtMainService;

    @Autowired
    public SAServiceImpl(PasswordEncoder passwordEncoder, SARepository saRepository, JWTMainService jwtMainService) {
        this.passwordEncoder = passwordEncoder;
        this.saRepository = saRepository;
        this.jwtMainService = jwtMainService;
    }

    @Override
    public ServiceResponceDTO getToken(ServiceRequestDTO requestDTO) {
        //we already have manually created account in DB for telegram with generated "hash" for the secret code
        //so, we just get it
        ServiceAccount serviceAccount = saRepository.findByServiceName(requestDTO.getServiceName());
        if (serviceAccount == null)
            throw new ServiceAccountNotFoundException("Not found service account for :" + requestDTO.getServiceName());

        //validate "secret" from request
        // If not valid, throw exception

        if (!passwordEncoder.matches(requestDTO.getSecret(), serviceAccount.getSecretHash())){
            throw new AuthCodeException("Recieved auth code does not match code in DB");
        }

        //If valid:
        //create new JWTtokenDTO
        Instant issuedAt = Instant.now();
        Instant expirationDate = Instant.now().plus(1, ChronoUnit.MINUTES);
        JWTtokenDTO jwTtokenDTO = new JWTtokenDTO("SERVICE", List.of("ROLE_SERVICE"), "telegram", issuedAt, expirationDate);
        String jwtToken = jwtMainService.generate(jwTtokenDTO);

        //create responseDTO
        ServiceResponceDTO responseDTO = new ServiceResponceDTO(jwtToken, expirationDate);

        return responseDTO;
    }
}
