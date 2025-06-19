package com.concreteware.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public abstract class Usuario {

    protected String id;           // ID del usuario (puede ser el UID de Firebase Auth)
    protected String nombre;       // Nombre completo
    protected String email;        // Correo electrónico
    protected String telefono;     // Número de contacto
    protected String dni;          // Número de documento de identidad
}
