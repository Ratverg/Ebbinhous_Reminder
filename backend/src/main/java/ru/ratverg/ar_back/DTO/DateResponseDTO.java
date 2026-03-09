package ru.ratverg.ar_back.DTO;

import java.time.Instant;

public class DateResponseDTO {
    private int id;
    private Instant repeatDate;
    private Instant sentAt;
    private String status;

    public DateResponseDTO(Instant repeatDate, Instant sentAt, String status) {
        this.repeatDate = repeatDate;
        this.sentAt = sentAt;
        this.status = status;
    }

    public DateResponseDTO() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Instant getRepeatDate() {
        return repeatDate;
    }

    public void setRepeatDate(Instant repeatDate) {
        this.repeatDate = repeatDate;
    }

    public Instant getSentAt() {
        return sentAt;
    }

    public void setSentAt(Instant sentAt) {
        this.sentAt = sentAt;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
