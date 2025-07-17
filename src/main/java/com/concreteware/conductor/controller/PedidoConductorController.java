package com.concreteware.conductor.controller;

import com.concreteware.conductor.service.PedidoConductorService;
import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.Ubicacion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/conductor/pedidos")
public class PedidoConductorController {
    private final PedidoConductorService pedidoConductorService;

    @Autowired
    public PedidoConductorController(PedidoConductorService pedidoConductorService) {
        this.pedidoConductorService = pedidoConductorService;
    }

    @GetMapping
    public List<Pedido> listarPedidosAsignados(@RequestParam String idConductor, @PathVariable String idPlanta) {
        return pedidoConductorService.listarPedidosAsignados(idConductor, idPlanta);
    }

    @GetMapping("/{idPedido}")
    public Pedido obtenerPedidoPorId(@PathVariable String idPedido, @PathVariable String idPlanta) {
        return pedidoConductorService.obtenerPedidoPorId(idPedido, idPlanta);
    }

    @PatchMapping("/{idPedido}/estado")
    public Pedido cambiarEstadoPedido(@PathVariable String idPedido, @RequestParam String nuevoEstado, @PathVariable String idPlanta) {
        return pedidoConductorService.cambiarEstadoPedido(idPedido, nuevoEstado, idPlanta);
    }

    @PatchMapping("/{idPedido}/ubicacion")
    public Pedido actualizarUbicacion(@PathVariable String idPedido, @RequestBody Ubicacion ubicacion, @PathVariable String idPlanta) {
        return pedidoConductorService.actualizarUbicacion(idPedido, ubicacion, idPlanta);
    }

    @PostMapping("/{idPedido}/evidencia")
    public String subirEvidencia(@PathVariable String idPedido, @RequestParam MultipartFile archivo, @PathVariable String idPlanta) {
        return pedidoConductorService.subirEvidencia(idPedido, archivo, idPlanta);
    }
} 