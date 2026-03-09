package ru.ratverg.ar_back.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwt;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.persistence.criteria.CriteriaBuilder;
import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.DTO.JWTprincipals;
import ru.ratverg.ar_back.DTO.JWTtokenDTO;
import ru.ratverg.ar_back.exception.AuthCodeException;
import ru.ratverg.ar_back.security.JWTPrincipals.TelegramJwtPayload;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.util.Date;

@Service
public class JWTMainService {
//    TODO
    private final SecretKey key = Keys.hmacShaKeyFor(
            "ratsecretratsecretratsecretratsecretratsecretratsecret".getBytes()
    );

    public String generate(JWTtokenDTO token){
//        Instant issuedAt = Instant.now();
//        Instant expirationDate = Instant.now().plus(TTLmin, ChronoUnit.MINUTES);
        return Jwts.builder()
                .claim("type", token.getType())
                .claim("roles", token.getType())
                .setSubject(token.getSubject())
                .setIssuedAt(Date.from(token.getIssuedAt()))
                .setExpiration(Date.from(token.getExpiration()))
                .signWith(key, SignatureAlgorithm.HS256) //set HS256 algorithm
                .compact();
        }

    public JWTprincipals validate (String token){
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            String subject = claims.getSubject();
            String roles = claims.get("roles", String.class);
            return new JWTprincipals(subject, roles);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }

    public boolean isExpired(String token) {
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            Instant expirationDate = claims.getExpiration().toInstant();
            Instant dateTimeNow = Instant.now();
            return expirationDate.isBefore(dateTimeNow);
        } catch (Exception e) {
            System.out.println(e.getMessage());
            //return token is not expired with any error
            return true;
        }
    }
}

