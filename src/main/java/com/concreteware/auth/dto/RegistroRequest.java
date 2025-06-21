package com.concreteware.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegistroRequest {
    private String email;
    private String password;
    private String tipoUsuario; // ADMINISTRADOR, CLIENTE, CONDUCTOR
}
