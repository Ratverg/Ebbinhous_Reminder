package ru.ratverg.ar_back.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;

@Entity
@Table(name = "tg_user")
public class TGUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @OneToOne
    @JoinColumn(name = "ar_user_id")
    @JsonBackReference
    private ARUser arUser;

    private int telegramId;
    private String authCodeTemp;
    private int chatId;
    private String tgUsername;

    public TGUser(ARUser arUser, int telegramId, String authCodeTemp, int chatId, String tgUsername) {
        this.arUser = arUser;
        this.telegramId = telegramId;
        this.authCodeTemp = authCodeTemp;
        this.chatId = chatId;
        this.tgUsername = tgUsername;
    }

    public TGUser() {
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

    public int getTelegramId() {
        return telegramId;
    }

    public void setTelegramId(int telegramId) {
        this.telegramId = telegramId;
    }

    public String getAuthCodeTemp() {
        return authCodeTemp;
    }

    public void setAuthCodeTemp(String authCodeTemp) {
        this.authCodeTemp = authCodeTemp;
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getTgUsername() {
        return tgUsername;
    }

    public void setTgUsername(String tgUsername) {
        this.tgUsername = tgUsername;
    }
}
