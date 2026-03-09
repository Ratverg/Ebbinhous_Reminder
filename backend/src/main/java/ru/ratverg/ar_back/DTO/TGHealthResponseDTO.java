package ru.ratverg.ar_back.DTO;

public class TGHealthResponseDTO {
    public boolean botOnline;

    public TGHealthResponseDTO(boolean botOnline) {
        this.botOnline = botOnline;
    }

    public TGHealthResponseDTO() {
    }

    public boolean isBotOnline() {
        return botOnline;
    }

    public void setBotOnline(boolean botOnline) {
        this.botOnline = botOnline;
    }
}
