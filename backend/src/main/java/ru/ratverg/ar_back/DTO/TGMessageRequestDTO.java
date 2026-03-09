package ru.ratverg.ar_back.DTO;

public class TGMessageRequestDTO {
    private int chatId;
    private String text;

    public TGMessageRequestDTO(int chaitId, String text) {
        this.chatId = chaitId;
        this.text = text;
    }

    public TGMessageRequestDTO() {
    }

    public int getChatId() {
        return chatId;
    }

    public void setChatId(int chatId) {
        this.chatId = chatId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
