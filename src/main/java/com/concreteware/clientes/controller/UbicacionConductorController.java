package com.concreteware.clientes.controller;

import com.concreteware.clientes.service.UbicacionConductorService;
import com.concreteware.core.model.Ubicacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{idPlanta}/cliente/pedidos/{idPedido}/ubicacion-conductor")
public class UbicacionConductorController {
    private final UbicacionConductorService ubicacionConductorService;

    @Autowired
    public UbicacionConductorController(UbicacionConductorService ubicacionConductorService) {
        this.ubicacionConductorService = ubicacionConductorService;
    }

    @GetMapping
    public Ubicacion obtenerUbicacionConductor(@PathVariable String idPlanta, @PathVariable String idPedido) {
        return ubicacionConductorService.obtenerUbicacionConductor(idPlanta, idPedido);
    }
} 