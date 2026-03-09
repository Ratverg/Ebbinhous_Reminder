package ru.ratverg.ar_back.provider;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import ru.ratverg.ar_back.DTO.JWTtokenDTO;
import ru.ratverg.ar_back.service.JWTMainService;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class TokenProvider {
    private String token;
    private JWTMainService jwtMainService;

    @Autowired
    public TokenProvider(JWTMainService jwtMainService) {
        this.jwtMainService = jwtMainService;
    }

    public TokenProvider() {
    }

    public String getToken() {
        if ((this.token != null) && (!jwtMainService.isExpired(this.token)))
            //just return token
            return this.token;

        //create new JWTtokenDTO if there is no valid token
        Instant issuedAt = Instant.now();
        Instant expirationDate = Instant.now().plus(1, ChronoUnit.MINUTES);
        JWTtokenDTO jwTtokenDTO = new JWTtokenDTO("SERVICE", List.of("ROLE_SERVICE"), "server", issuedAt, expirationDate);
        //generate new JWTToken
        String newToken = jwtMainService.generate(jwTtokenDTO);
        this.token = newToken;
        return this.token;
    }

    public void setToken(String token) {
        this.token = token;
    }
}
