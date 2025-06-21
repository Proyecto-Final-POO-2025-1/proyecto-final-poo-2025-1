package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.PedidoAdminService;
import com.concreteware.common.enums.EstadoPedido;
import com.concreteware.core.model.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/pedidos")
public class PedidoAdminController {

    private final PedidoAdminService pedidoService;

    @Autowired
    public PedidoAdminController(PedidoAdminService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public String crearPedido(@RequestBody Pedido pedido) {
        return pedidoService.crearPedido(pedido);
    }

    @GetMapping("/{id}")
    public Pedido obtenerPedidoPorId(@PathVariable String id) {
        return pedidoService.obtenerPedidoPorId(id);
    }

    @GetMapping
    public List<Pedido> listarPedidos() {
        return pedidoService.listarPedidos();
    }

    @PatchMapping("/{id}/estado")
    public void actualizarEstado(@PathVariable String id, @RequestParam EstadoPedido nuevoEstado) {
        pedidoService.actualizarEstadoPedido(id, nuevoEstado);
    }

    @PatchMapping("/{id}/conductor")
    public void asignarConductor(@PathVariable String id, @RequestParam String idConductor) {
        pedidoService.asignarConductorYPedido(id, idConductor);
    }
}
