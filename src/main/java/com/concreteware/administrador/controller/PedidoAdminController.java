package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.PedidoAdminService;
import com.concreteware.common.enums.EstadoPedido;
import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.ProductoPedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/pedidos")
public class PedidoAdminController {

    private final PedidoAdminService pedidoService;

    @Autowired
    public PedidoAdminController(PedidoAdminService pedidoService) {
        this.pedidoService = pedidoService;
    }

    @PostMapping
    public String crearPedido(@RequestBody Pedido pedido, @PathVariable String idPlanta) {
        return pedidoService.crearPedido(pedido, idPlanta);
    }

    @GetMapping("/{id}")
    public Pedido obtenerPedidoPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return pedidoService.obtenerPedidoPorId(id, idPlanta);
    }

    @GetMapping
    public List<Pedido> listarPedidos(@PathVariable String idPlanta) {
        return pedidoService.listarPedidos(idPlanta);
    }

    @PatchMapping("/{id}/estado")
    public void actualizarEstado(@PathVariable String id, @RequestParam EstadoPedido nuevoEstado, @PathVariable String idPlanta) {
        pedidoService.actualizarEstadoPedido(id, nuevoEstado, idPlanta);
    }

    @PatchMapping("/{id}/conductor")
    public void asignarConductor(@PathVariable String id, @RequestParam String idConductor, @PathVariable String idPlanta) {
        pedidoService.asignarConductorYPedido(id, idConductor, idPlanta);
    }

    @PatchMapping("/{id}/productos")
    public Pedido actualizarProductosPedido(@PathVariable String id, @RequestBody List<ProductoPedido> productos, @PathVariable String idPlanta) {
        return pedidoService.actualizarProductosPedido(id, productos, idPlanta);
    }
}
