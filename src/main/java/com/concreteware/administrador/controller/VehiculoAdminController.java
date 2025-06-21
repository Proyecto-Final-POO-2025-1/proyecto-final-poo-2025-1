package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.VehiculoAdminService;
import com.concreteware.core.model.Vehiculo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/vehiculos")
public class VehiculoAdminController {

    private final VehiculoAdminService vehiculoService;

    @Autowired
    public VehiculoAdminController(VehiculoAdminService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    @PostMapping
    public String crearVehiculo(@RequestBody Vehiculo vehiculo) {
        return vehiculoService.crearVehiculo(vehiculo);
    }

    @GetMapping("/{id}")
    public Vehiculo obtenerVehiculoPorId(@PathVariable String id) {
        return vehiculoService.obtenerVehiculoPorId(id);
    }

    @GetMapping
    public List<Vehiculo> listarVehiculos() {
        return vehiculoService.listarVehiculos();
    }

    @PutMapping("/{id}")
    public Vehiculo actualizarVehiculo(@PathVariable String id, @RequestBody Vehiculo vehiculo) {
        vehiculo.setIdVehiculo(id);
        return vehiculoService.actualizarVehiculo(vehiculo);
    }

    @DeleteMapping("/{id}")
    public void eliminarVehiculo(@PathVariable String id) {
        vehiculoService.eliminarVehiculo(id);
    }
}
