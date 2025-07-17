package com.concreteware.administrador.service;

import com.concreteware.core.model.Conductor;
import java.util.List;
import com.concreteware.administrador.dto.ConductorConPasswordDTO;

public interface ConductorAdminService {
    ConductorConPasswordDTO crearConductor(Conductor conductor, String idPlanta);
    void eliminarConductor(String idConductor, String idPlanta);
    Conductor obtenerConductorPorId(String idConductor, String idPlanta);
    List<Conductor> listarConductores(String idPlanta);
    Conductor actualizarConductor(Conductor conductor, String idPlanta);
}
