package com.concreteware.administrador.service;

import com.concreteware.core.model.Planta;
import com.google.api.services.storage.Storage;

import java.util.List;

public interface PlantaAdminService {
    public List<Planta> listarPlantas();
}
