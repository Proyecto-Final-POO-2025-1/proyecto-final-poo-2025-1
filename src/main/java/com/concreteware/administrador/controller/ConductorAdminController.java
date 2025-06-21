package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ConductorAdminService;
import com.concreteware.core.model.Conductor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/conductores")
public class ConductorAdminController {

    private final ConductorAdminService conductorService;

    @Autowired
    public ConductorAdminController(ConductorAdminService conductorService) {
        this.conductorService = conductorService;
    }

    @PostMapping
    public String crearConductor(@RequestBody Conductor conductor, @PathVariable String idPlanta) {
        return conductorService.crearConductor(conductor, idPlanta);
    }

    @GetMapping("/{id}")
    public Conductor obtenerConductorPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return conductorService.obtenerConductorPorId(id, idPlanta);
    }

    @GetMapping
    public List<Conductor> listarConductores(@PathVariable String idPlanta) {
        return conductorService.listarConductores(idPlanta);
    }

    @PutMapping("/{id}")
    public Conductor actualizarConductor(@PathVariable String id, @RequestBody Conductor conductor, @PathVariable String idPlanta) {
        conductor.setId(id);
        return conductorService.actualizarConductor(conductor, idPlanta);
    }

    @DeleteMapping("/{id}")
    public void eliminarConductor(@PathVariable String id, @PathVariable String idPlanta) {
        conductorService.eliminarConductor(id, idPlanta);
    }
}
