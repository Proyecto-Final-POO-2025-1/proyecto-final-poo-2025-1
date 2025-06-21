package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Vehiculo;

public interface VehiculoAdminService {
    String crearVehiculo(Vehiculo vehiculo);
    void eliminarVehiculo(String idVehiculo);
    Vehiculo obtenerVehiculoPorId(String idVehiculo);
    List<Vehiculo> listarVehiculos();
    Vehiculo actualizarVehiculo(Vehiculo vehiculo);
}
