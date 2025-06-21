package com.concreteware.administrador.service;

import com.concreteware.core.model.Conductor;
import java.util.List;

public interface ConductorAdminService {
        String crearConductor(Conductor conductor);
        void eliminarConductor(String idConductor);
        Conductor obtenerConductorPorId(String idConductor);
        List<Conductor> listarConductores();
        Conductor actualizarConductor(Conductor conductor);
}
