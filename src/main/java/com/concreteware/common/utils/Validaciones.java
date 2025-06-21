package com.concreteware.common.utils;

import com.concreteware.common.exception.ValidacionException;

public class Validaciones {

    // Valida que un campo no sea nulo ni vacío
    public static void validarCampoObligatorio(String nombreCampo, String valor) {
        if (valor == null || valor.trim().isEmpty()) {
            throw new ValidacionException("El campo '" + nombreCampo + "' es obligatorio.");
        }
    }

    // Valida que un objeto no sea nulo
    public static void validarNoNulo(String nombreCampo, Object valor) {
        if (valor == null) {
            throw new ValidacionException("El valor para '" + nombreCampo + "' no puede ser nulo.");
        }
    }

    // Valida que un número sea mayor a cero
    public static void validarMayorACero(String nombreCampo, double valor) {
        if (valor <= 0) {
            throw new ValidacionException("El campo '" + nombreCampo + "' debe ser mayor a cero.");
        }
    }

    // Valida que un string tenga longitud mínima
    public static void validarLongitudMinima(String nombreCampo, String valor, int longitudMinima) {
        if (valor == null || valor.length() < longitudMinima) {
            throw new ValidacionException("El campo '" + nombreCampo + "' debe tener al menos " + longitudMinima + " caracteres.");
        }
    }

    // Valida que un string sea un correo válido (muy básico)
    public static void validarEmail(String email) {
        if (email == null || !email.matches("^(.+)@(.+)$")) {
            throw new ValidacionException("El correo electrónico no es válido.");
        }
    }
}

