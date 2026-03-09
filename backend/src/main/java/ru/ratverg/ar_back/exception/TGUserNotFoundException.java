package ru.ratverg.ar_back.exception;

public class TGUserNotFoundException extends RuntimeException{
    public TGUserNotFoundException(String message) {
        super(message);
    }
}