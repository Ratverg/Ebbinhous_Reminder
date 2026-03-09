package ru.ratverg.ar_back.DTO;

public class TGUserResponseDTO {
    private int telegramId;
    private String authCodeTemp;
    private int chatId;
    private String tgUsername;

    public TGUserResponseDTO(int telegramId, String authCodeTemp, int chatId, String tgUsername) {
        this.telegramId = telegramId;
        this.authCodeTemp = authCodeTemp;
        this.chatId = chatId;
        this.tgUsername = tgUsername;
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
