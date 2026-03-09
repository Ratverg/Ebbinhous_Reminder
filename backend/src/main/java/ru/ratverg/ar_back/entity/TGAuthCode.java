package ru.ratverg.ar_back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

import java.time.Instant;

@Entity
@Table (name = "tg_auth_code")
public class TGAuthCode {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    //unique=true - this garantee that there will not be more then one code for one user
    @JoinColumn(name = "ar_user_id", unique = true )
    @JsonBackReference
    private ARUser arUser;
    private Instant createdAt;
    private Instant expiredAt;
    private boolean used;
    private int telegramId;
    private String authCodeTemp;
    private int chatId;

    public TGAuthCode(ARUser arUser, String authCodeTemp, Instant createdAt, Instant expiredAt, boolean used, int telegramId, int chatId) {
        this.arUser = arUser;
        this.authCodeTemp = authCodeTemp;
        this.createdAt = createdAt;
        this.expiredAt = expiredAt;
        this.used = used;
        this.telegramId = telegramId;
        this.chatId = chatId;
    }

    public TGAuthCode() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ARUser getArUser() {
        return arUser;
    }

    public void setArUser(ARUser arUser) {
        this.arUser = arUser;
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
