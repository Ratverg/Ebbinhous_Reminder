package ru.ratverg.ar_back.exception;

public class AuthCodeNotFoundException extends RuntimeException{
    public AuthCodeNotFoundException(String message) {
        super(message);
    }

}
