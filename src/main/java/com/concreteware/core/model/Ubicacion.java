package com.concreteware.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ubicacion {

    private double latitud;
    private double longitud;
    private String descripcion; // Opcional: “Planta central”, “Obra calle 8”, etc.
}
