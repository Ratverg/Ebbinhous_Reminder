package ru.ratverg.ar_back.DTO;

public class JWTprincipals {
    private String subject;
    //todo better delete it, could be compromised
    private String roles;

    public JWTprincipals(String subject, String roles) {
        this.subject = subject;
        this.roles = roles;
    }

    public JWTprincipals() {
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getRoles() {
        return roles;
    }

    public void setRoles(String roles) {
        this.roles = roles;
    }
}
