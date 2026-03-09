package ru.ratverg.ar_back.DTO;

public class TGAuthCodeRequestDTO {
    private String authCodeTemp;
    private int telegramId;
    private int chatId;
    private String tgUsername;

    public TGAuthCodeRequestDTO(String authCodeTemp, int telegramId, int chatId, String tgUsername) {
        this.authCodeTemp = authCodeTemp;
        this.telegramId = telegramId;
        this.chatId = chatId;
        this.tgUsername = tgUsername;
    }

    public TGAuthCodeRequestDTO() {
    }

    public String getAuthCodeTemp() {
        return authCodeTemp;
    }

    public void setAuthCodeTemp(String authCodeTemp) {
        this.authCodeTemp = authCodeTemp;
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

    public String getTgUsername() {
        return tgUsername;
    }

    public void setTgUsername(String tgUsername) {
        this.tgUsername = tgUsername;
    }
}
