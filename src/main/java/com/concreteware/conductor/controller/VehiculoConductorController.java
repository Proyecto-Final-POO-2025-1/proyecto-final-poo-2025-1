package com.concreteware.conductor.controller;

import com.concreteware.conductor.service.VehiculoConductorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/{idPlanta}/conductor/vehiculos/{idVehiculo}/checklist")
public class VehiculoConductorController {
    private final VehiculoConductorService vehiculoConductorService;

    @Autowired
    public VehiculoConductorController(VehiculoConductorService vehiculoConductorService) {
        this.vehiculoConductorService = vehiculoConductorService;
    }

    @PostMapping
    public String guardarChecklist(@PathVariable String idPlanta, @PathVariable String idVehiculo, @RequestBody String checklist) {
        return vehiculoConductorService.guardarChecklist(idPlanta, idVehiculo, checklist);
    }
} 