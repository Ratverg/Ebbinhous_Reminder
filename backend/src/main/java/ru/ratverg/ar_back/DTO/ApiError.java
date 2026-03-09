package ru.ratverg.ar_back.DTO;

import java.time.Instant;
import java.util.Map;

public class ApiError {
    private String code;
    private String message;
    private int status;
    private Instant timestamp;
    private Map<String, String> errors;


    public ApiError(String code, String message, int status, Instant timestamp, Map<String, String> errors) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.errors = errors;
    }
    public ApiError(String code, String message, int status, Instant timestamp) {
        this.code = code;
        this.message = message;
        this.status = status;
        this.timestamp = timestamp;
        this.errors = errors;
    }

    public ApiError() {
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Instant getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(Instant timestamp) {
        this.timestamp = timestamp;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
