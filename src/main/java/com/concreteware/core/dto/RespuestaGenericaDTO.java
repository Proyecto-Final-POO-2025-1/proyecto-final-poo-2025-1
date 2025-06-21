package com.concreteware.core.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

public class RespuestaGenericaDTO {
    private boolean success;
    private String message;
    private Object data;
}
