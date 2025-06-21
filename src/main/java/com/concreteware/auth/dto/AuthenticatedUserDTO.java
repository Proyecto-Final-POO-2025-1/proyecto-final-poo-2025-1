package com.concreteware.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class AuthenticatedUserDTO {
    private String uid;
    private String email;
    private String tipoUsuario;  // Se puede cargar desde Firestore si lo manejas ahí
}

