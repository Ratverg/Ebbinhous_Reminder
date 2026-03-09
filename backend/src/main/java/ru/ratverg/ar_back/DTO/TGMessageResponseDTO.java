package ru.ratverg.ar_back.DTO;

public class TGMessageResponseDTO {
    private boolean ok;

    public TGMessageResponseDTO(boolean ok) {
        this.ok = ok;
    }

    public TGMessageResponseDTO() {
    }

    public boolean isOk() {
        return ok;
    }

    public void setOk(boolean ok) {
        this.ok = ok;
    }
}
