package com.concreteware.common.exception;

public class FirebaseException extends RuntimeException {
    public FirebaseException(String message, Throwable cause) {
        super(message, cause);
    }

    public FirebaseException(String message) {
        super(message);
    }
}
