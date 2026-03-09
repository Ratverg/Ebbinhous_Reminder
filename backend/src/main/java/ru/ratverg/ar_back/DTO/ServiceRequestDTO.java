package ru.ratverg.ar_back.DTO;

public class ServiceRequestDTO {
    private String serviceName;
    private String secret;

    public ServiceRequestDTO(String serviceName, String secret) {
        this.serviceName = serviceName;
        this.secret = secret;
    }

    public ServiceRequestDTO() {
    }

    public String getServiceName() {
        return serviceName;
    }

    public void setServiceName(String serviceName) {
        this.serviceName = serviceName;
    }

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }
}
