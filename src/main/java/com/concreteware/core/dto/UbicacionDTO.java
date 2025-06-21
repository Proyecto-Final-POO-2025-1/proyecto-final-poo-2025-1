package com.concreteware.core.dto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UbicacionDTO {
    private double latitud;
    private double longitud;
    private String direccion;
}
