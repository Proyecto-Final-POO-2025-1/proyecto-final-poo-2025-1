package com.concreteware.common.utils;

import org.springframework.cglib.core.Local;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class FechaUtils {

    private static final String FORMATO_FECHA_HORA = "yyyy-MM-dd HH:mm:ss";

    public static String obtenerFechaActual() {
        return LocalDateTime.now().format(DateTimeFormatter.ofPattern(FORMATO_FECHA_HORA));
    }

    public static LocalDateTime ahora() {
        return LocalDateTime.now();
    }

    public static Boolean esPasado(LocalDateTime fecha) {
        return fecha.isBefore(ahora());
    }

    public static LocalDateTime sumarHoras(LocalDateTime fecha, int horas) {
        return fecha.plusHours(horas);
    }

    public static LocalDateTime parsear(String fechaStr) {
        return LocalDateTime.parse(fechaStr, DateTimeFormatter.ofPattern(FORMATO_FECHA_HORA));
    }

    public static String formatar(LocalDateTime fecha) {
        return fecha.format(DateTimeFormatter.ofPattern(FORMATO_FECHA_HORA));
    }
}
