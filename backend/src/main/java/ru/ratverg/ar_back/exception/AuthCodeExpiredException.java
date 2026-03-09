package ru.ratverg.ar_back.exception;

public class AuthCodeExpiredException extends RuntimeException{
    public AuthCodeExpiredException(String message) {
        super(message);
    }
}
