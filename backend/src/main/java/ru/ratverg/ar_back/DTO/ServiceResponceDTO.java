package ru.ratverg.ar_back.DTO;

import com.fasterxml.jackson.annotation.JsonFormat;

import java.time.Instant;

public class ServiceResponceDTO {
    private String jwtToken;

    //format expiredAt responce, to make it suitable for python =) python do not understand ms
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss'Z'", timezone = "UTC")
    private Instant expiredAt;

    public ServiceResponceDTO(String jwtToken, Instant expiredAt) {
        this.jwtToken = jwtToken;
        this.expiredAt = expiredAt;
    }

    public ServiceResponceDTO() {
    }

    public String getJwtToken() {
        return jwtToken;
    }

    public void setJwtToken(String jwtToken) {
        this.jwtToken = jwtToken;
    }

    public Instant getExpiredAt() {
        return expiredAt;
    }

    public void setExpiredAt(Instant expiredAt) {
        this.expiredAt = expiredAt;
    }
}
