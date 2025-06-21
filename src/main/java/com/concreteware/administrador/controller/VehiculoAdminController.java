package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.VehiculoAdminService;
import com.concreteware.core.model.Vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/vehiculos")
public class VehiculoAdminController {

    private final VehiculoAdminService vehiculoService;

    @Autowired
    public VehiculoAdminController(VehiculoAdminService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    @PostMapping
    public String crearVehiculo(@RequestBody Vehiculo vehiculo, @PathVariable String idPlanta) {
        return vehiculoService.crearVehiculo(vehiculo, idPlanta);
    }

    @GetMapping("/{id}")
    public Vehiculo obtenerVehiculoPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return vehiculoService.obtenerVehiculoPorId(id, idPlanta);
    }

    @GetMapping
    public List<Vehiculo> listarVehiculos(@PathVariable String idPlanta) {
        return vehiculoService.listarVehiculos(idPlanta);
    }

    @PutMapping("/{id}")
    public Vehiculo actualizarVehiculo(@PathVariable String id, @RequestBody Vehiculo vehiculo, @PathVariable String idPlanta) {
        vehiculo.setIdVehiculo(id);
        return vehiculoService.actualizarVehiculo(vehiculo, idPlanta);
    }

    @DeleteMapping("/{id}")
    public void eliminarVehiculo(@PathVariable String id, @PathVariable String idPlanta) {
        vehiculoService.eliminarVehiculo(id, idPlanta);
    }
}
