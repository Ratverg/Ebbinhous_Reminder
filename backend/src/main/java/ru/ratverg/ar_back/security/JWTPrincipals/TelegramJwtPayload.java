package ru.ratverg.ar_back.security.JWTPrincipals;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.time.Instant;
import java.util.List;

public class TelegramJwtPayload {
    private int userId;
    private int telegramId;

    public TelegramJwtPayload(int userId, int telegramId) {
        this.userId = userId;
        this.telegramId = telegramId;

    }
    public TelegramJwtPayload() {
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getTelegramId() {
        return telegramId;
    }

    public void setTelegramId(int telegramId) {
        this.telegramId = telegramId;
    }

    public List<GrantedAuthority> getAuthorities () {
        return List.of(new SimpleGrantedAuthority("ROLE_TELEGRAM"));
    }
}
