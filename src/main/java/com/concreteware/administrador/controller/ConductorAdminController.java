package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ConductorAdminService;
import com.concreteware.core.model.Conductor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/conductores")
public class ConductorAdminController {

    private final ConductorAdminService conductorService;

    @Autowired
    public ConductorAdminController(ConductorAdminService conductorService) {
        this.conductorService = conductorService;
    }

    @PostMapping
    public String crearConductor(@RequestBody Conductor conductor) {
        return conductorService.crearConductor(conductor);
    }

    @GetMapping("/{id}")
    public Conductor obtenerConductorPorId(@PathVariable String id) {
        return conductorService.obtenerConductorPorId(id);
    }

    @GetMapping
    public List<Conductor> listarConductores() {
        return conductorService.listarConductores();
    }

    @PutMapping("/{id}")
    public Conductor actualizarConductor(@PathVariable String id, @RequestBody Conductor conductor) {
        conductor.setId(id);
        return conductorService.actualizarConductor(conductor);
    }

    @DeleteMapping("/{id}")
    public void eliminarConductor(@PathVariable String id) {
        conductorService.eliminarConductor(id);
    }
}
