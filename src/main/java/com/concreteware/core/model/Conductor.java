package com.concreteware.core.model;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import com.concreteware.core.model.Ubicacion;

@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class Conductor extends Usuario {

    private String licenciaConduccion;
    private boolean activo;
    private Ubicacion ubicacionActual;
}
