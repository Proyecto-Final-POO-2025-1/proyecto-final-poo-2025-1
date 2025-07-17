package com.concreteware.clientes.service;

import com.concreteware.core.model.Ubicacion;

public interface UbicacionConductorService {
    Ubicacion obtenerUbicacionConductor(String idPlanta, String idPedido);
} 