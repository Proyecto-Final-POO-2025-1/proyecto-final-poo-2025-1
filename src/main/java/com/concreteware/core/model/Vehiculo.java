package com.concreteware.core.model;

import com.concreteware.core.model.Ubicacion;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehiculo {

    private String idVehiculo;          // ID único generado por Firebase
    private String placa;              // Ej: "XYZ-123"
    private String tipo;               // Ej: "Mixer", "Volqueta", etc.
    private double capacidadM3;        // Capacidad del tanque en m³
    private boolean activo;            // Para deshabilitar vehículos sin borrarlos
    private Ubicacion ubicacionActual; // Actualizada por el conductor en tiempo real
    private String idConductor;       // ID del conductor asignado (referencia a Conductor.id)
}
