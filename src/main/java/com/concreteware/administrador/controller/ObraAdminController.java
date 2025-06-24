package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ObraAdminService;
import com.concreteware.core.model.Obra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/obras")
public class ObraAdminController {

    private final ObraAdminService obraService;

    @Autowired
    public ObraAdminController(ObraAdminService obraService) {
        this.obraService = obraService;
    }

    @GetMapping
    public List<Obra> listarObras(@PathVariable String idPlanta) {
        return obraService.listarObras(idPlanta);
    }

    @PostMapping
    public String crearObra(@RequestBody Obra obra, @PathVariable String idPlanta) {
        return obraService.crearObra(obra, idPlanta);
    }

    @GetMapping("/{id}")
    public Obra obtenerObraPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return obraService.obtenerObraPorId(id, idPlanta);
    }

    @GetMapping("/cliente/{idCliente}")
    public List<Obra> listarObrasPorCliente(@PathVariable String idCliente, @PathVariable String idPlanta) {
        return obraService.listarObras(idCliente, idPlanta);
    }

    @PutMapping("/{id}")
    public Obra actualizarObra(@PathVariable String id, @RequestBody Obra obra, @PathVariable String idPlanta) {
        obra.setIdObra(id);
        return obraService.actualizarObra(obra, idPlanta);
    }

    @DeleteMapping("/{id}")
    public void eliminarObra(@PathVariable String id, @PathVariable String idPlanta) {
        obraService.eliminarObra(id, idPlanta);
    }
}

