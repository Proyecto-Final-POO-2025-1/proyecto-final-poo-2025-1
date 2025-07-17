package com.concreteware.conductor.controller;

import com.concreteware.conductor.service.NovedadConductorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{idPlanta}/conductor/pedidos/{idPedido}/novedad")
public class NovedadConductorController {
    private final NovedadConductorService novedadConductorService;

    @Autowired
    public NovedadConductorController(NovedadConductorService novedadConductorService) {
        this.novedadConductorService = novedadConductorService;
    }

    @PostMapping
    public String reportarNovedad(@PathVariable String idPlanta, @PathVariable String idPedido, @RequestBody String descripcion) {
        return novedadConductorService.reportarNovedad(idPlanta, idPedido, descripcion);
    }
} 