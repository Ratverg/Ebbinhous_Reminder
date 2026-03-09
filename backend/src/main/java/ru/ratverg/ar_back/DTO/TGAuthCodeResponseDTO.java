package ru.ratverg.ar_back.DTO;

import java.time.Instant;

public class TGAuthCodeResponseDTO {
//    private ARUser arUser;
    private Instant createdAt;
    private Instant expiredAt;
    private boolean used;
    private int telegramId;
    private String authCodeTemp;
    private int chatId;

    public TGAuthCodeResponseDTO(String authCodeTemp, Instant createdAt, Instant expiredAt, boolean used, int telegramId, int chatId) {
        this.authCodeTemp = authCodeTemp;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.used = used;
        this.telegramId = telegramId;
        this.chatId = chatId;
    }

    public TGAuthCodeResponseDTO() {
    }

    public String getAuthCodeTemp() {
        return authCodeTemp;
    }

    public void setAuthCodeTemp(String authCodeTemp) {
        this.authCodeTemp = authCodeTemp;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(Instant expiredAt) {
        this.expiredAt = expiredAt;
    }

    public boolean isUsed() {
        return used;
    }

    public void setUsed(boolean used) {
        this.used = used;
    }

    public int getTelegramId() {
        return telegramId;
    }

    public void setTelegramId(int telegramId) {
        this.telegramId = telegramId;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }
}
