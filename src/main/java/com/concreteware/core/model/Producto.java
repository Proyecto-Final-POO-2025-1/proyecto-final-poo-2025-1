package com.concreteware.core.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    private String idProducto;             // Generado por Firebase
    private String nombreComercial;        // Ej: "Concreto 3000 PSI"
    private String descripcion;            // Ej: "Concreto estructural con aditivo acelerante"
    private double precioBase;             // Precio de referencia por m³ (puede modificarse en pedidos)
}
