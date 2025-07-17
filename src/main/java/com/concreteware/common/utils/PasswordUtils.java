package com.concreteware.common.utils;

import java.security.SecureRandom;

public class PasswordUtils {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&*";
    private static final int DEFAULT_LENGTH = 10;
    private static final SecureRandom random = new SecureRandom();

    public static String generateRandomPassword() {
        return generateRandomPassword(DEFAULT_LENGTH);
    }

    public static String generateRandomPassword(int length) {
        StringBuilder sb = new StringBuilder(length);
        for (int i = 0; i < length; i++) {
            int idx = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(idx));
        }
        return sb.toString();
    }
} 