package com.concreteware.administrador.dto;

import com.concreteware.core.model.Conductor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ConductorConPasswordDTO {
    private Conductor conductor;
    private String password;
} 