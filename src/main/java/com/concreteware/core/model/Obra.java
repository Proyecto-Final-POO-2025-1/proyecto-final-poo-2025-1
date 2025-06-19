package com.concreteware.core.model;

import com.concreteware.core.enums.EstadoObra;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Obra {

    private String idObra;
    private String nombreObra;
    private String direccion;
    private String municipio;
    private Ubicacion ubicacion;           // Clase compartida con coordenadas
    private EstadoObra estado;             // Enum: ACTIVA, FINALIZADA, CANCELADA
    private String fechaInicio;            // formato YYYY-MM-DD
    private String idCliente;              // ID Firebase del cliente dueño
}

