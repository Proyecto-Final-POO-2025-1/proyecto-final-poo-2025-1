package com.concreteware.auth.controller;

import com.concreteware.administrador.service.PlantaAdminService;
import com.concreteware.core.model.Planta;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plantas")
public class PlantController {

    private final PlantaAdminService plantaService;

    @Autowired
    public PlantController(PlantaAdminService plantaService) {
        this.plantaService = plantaService;
    }


    @GetMapping
    public List<Planta> obtenerTodos() {
        return plantaService.listarPlantas();
    }
}

