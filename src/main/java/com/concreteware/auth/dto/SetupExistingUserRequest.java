package com.concreteware.auth.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class SetupExistingUserRequest {
    private String email;
    private String tipoUsuario;

    public SetupExistingUserRequest() {}

    public SetupExistingUserRequest(String email, String tipoUsuario) {
        this.email = email;
        this.tipoUsuario = tipoUsuario;
    }

}