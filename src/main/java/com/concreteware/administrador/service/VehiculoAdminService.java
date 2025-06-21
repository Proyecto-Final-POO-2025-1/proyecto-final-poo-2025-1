package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Vehiculo;

public interface VehiculoAdminService {
    String crearVehiculo(Vehiculo vehiculo, String idPlanta);
    void eliminarVehiculo(String idVehiculo, String idPlanta);
    Vehiculo obtenerVehiculoPorId(String idVehiculo, String idPlanta);
    List<Vehiculo> listarVehiculos(String idPlanta);
    Vehiculo actualizarVehiculo(Vehiculo vehiculo, String idPlanta);
}
