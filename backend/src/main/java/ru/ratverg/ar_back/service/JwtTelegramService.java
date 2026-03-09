package ru.ratverg.ar_back.service;
import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;

import org.springframework.stereotype.Service;
import ru.ratverg.ar_back.security.JWTPrincipals.TelegramJwtPayload;

import javax.crypto.SecretKey;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

@Service
public class JwtTelegramService {
    private final SecretKey key = Keys.hmacShaKeyFor(
            "ratsecretratsecretratsecretratsecretratsecretratsecret".getBytes()
    );

    public String generate(Long userId, int telegramId){
        Instant issuedAt = Instant.now();
        Instant expirationDate = Instant.now().plus(365, ChronoUnit.DAYS);
        return Jwts.builder()
                .setSubject("tg-auth")
                .claim("userId", userId)
                .claim("telegramId", telegramId)
                .setIssuedAt(Date.from(issuedAt))
                .setExpiration(Date.from(expirationDate))
                .signWith(key)
                .compact();
    }

    public TelegramJwtPayload validate (String token){
        try {
            Claims claims = Jwts.parser()
                    .verifyWith(key)
                    .build()
                    .parseSignedClaims(token)
                    .getPayload();
            int userId = claims.get("userId", Integer.class);
            int telegramId = claims.get("telegramId", Integer.class);
            return new TelegramJwtPayload(userId, telegramId);
        } catch (Exception e) {
            System.out.println(e);
            return null;
        }
    }
}
