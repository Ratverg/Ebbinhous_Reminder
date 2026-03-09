package ru.ratverg.ar_back.exception;

public class AuthCodeException extends RuntimeException{
    public AuthCodeException(String message) {
        super(message);
    }
}
