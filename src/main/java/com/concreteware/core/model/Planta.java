package com.concreteware.core.model;

import com.concreteware.common.enums.EstadoObra;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Planta{

    private String idPlanta;
    private String nombre;
    private String baseUrl;

}