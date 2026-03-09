package ru.ratverg.ar_back.DTO;

import java.time.Instant;
import java.util.List;

public class JWTtokenDTO {
    private String type;
    private List<String> roles;
    private String subject;
    private Instant issuedAt;
    private Instant expiration;

    public JWTtokenDTO(String type, List<String> roles, String subject, Instant issuedAt, Instant expiration) {
        this.type = type;
        this.roles = roles;
        this.subject = subject;
        this.issuedAt = issuedAt;
        this.expiration = expiration;
    }

    public JWTtokenDTO() {
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public List<String> getRoles() {
        return roles;
    }

    public void setRoles(List<String> roles) {
        this.roles = roles;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public Instant getIssuedAt() {
        return issuedAt;
    }

    public void setIssuedAt(Instant issuedAt) {
        this.issuedAt = issuedAt;
    }

    public Instant getExpiration() {
        return expiration;
    }

    public void setExpiration(Instant expiration) {
        this.expiration = expiration;
    }
}
