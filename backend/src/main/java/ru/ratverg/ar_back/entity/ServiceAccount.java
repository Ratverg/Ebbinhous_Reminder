package ru.ratverg.ar_back.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "service_account")
public class ServiceAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String serviceName;
    private String secretHash;
    private String role;
    private boolean enable;

    public ServiceAccount(String serviceName, String secretHash, String role, boolean enable) {
        this.serviceName = serviceName;
        this.secretHash = secretHash;
        this.role = role;
        this.enable = enable;
    }

    public ServiceAccount() {
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getSecretHash() {
        return secretHash;
    }

    public void setSecretHash(String secretHash) {
        this.secretHash = secretHash;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEnable() {
        return enable;
    }

    public void setEnable(boolean enable) {
        this.enable = enable;
    }
}
