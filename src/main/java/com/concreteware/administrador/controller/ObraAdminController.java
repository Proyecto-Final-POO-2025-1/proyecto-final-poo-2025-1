package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ObraAdminService;
import com.concreteware.core.model.Obra;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/obras")
public class ObraAdminController {

    private final ObraAdminService obraService;

    @Autowired
    public ObraAdminController(ObraAdminService obraService) {
        this.obraService = obraService;
    }

    @PostMapping
    public String crearObra(@RequestBody Obra obra) {
        return obraService.crearObra(obra);
    }

    @GetMapping("/{id}")
    public Obra obtenerObraPorId(@PathVariable String id) {
        return obraService.obtenerObraPorId(id);
    }

    @GetMapping("/cliente/{idCliente}")
    public List<Obra> listarObrasPorCliente(@PathVariable String idCliente) {
        return obraService.listarObras(idCliente);
    }

    @PutMapping("/{id}")
    public Obra actualizarObra(@PathVariable String id, @RequestBody Obra obra) {
        obra.setIdObra(id);
        return obraService.actualizarObra(obra);
    }

    @DeleteMapping("/{id}")
    public void eliminarObra(@PathVariable String id) {
        obraService.eliminarObra(id);
    }
}

