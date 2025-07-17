package com.concreteware.clientes.controller;

import com.concreteware.clientes.service.PedidoClienteService;
import com.concreteware.core.model.Pedido;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/cliente/pedidos")
public class PedidoClienteController {
    private final PedidoClienteService pedidoClienteService;

    @Autowired
    public PedidoClienteController(PedidoClienteService pedidoClienteService) {
        this.pedidoClienteService = pedidoClienteService;
    }

    @GetMapping
    public List<Pedido> listarPedidosCliente(@RequestParam String idCliente, @PathVariable String idPlanta) {
        // TODO: Implementar lógica para listar pedidos de un cliente
        return pedidoClienteService.listarPedidosCliente(idCliente, idPlanta);
    }

    @GetMapping("/{idPedido}")
    public Pedido obtenerPedidoPorId(@PathVariable String idPedido, @PathVariable String idPlanta) {
        // TODO: Implementar lógica para obtener detalles de un pedido
        return pedidoClienteService.obtenerPedidoPorId(idPedido, idPlanta);
    }

    @PatchMapping("/{idPedido}/cantidad")
    public Pedido modificarCantidad(@PathVariable String idPedido, @RequestParam double nuevaCantidad, @PathVariable String idPlanta) {
        // TODO: Implementar lógica para modificar cantidad si el estado lo permite
        return pedidoClienteService.modificarCantidad(idPedido, nuevaCantidad, idPlanta);
    }
} 