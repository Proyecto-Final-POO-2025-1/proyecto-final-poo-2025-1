package com.concreteware.administrador.dto;

import com.concreteware.core.model.Cliente;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ClienteConPasswordDTO {
    private Cliente cliente;
    private String password;
} 