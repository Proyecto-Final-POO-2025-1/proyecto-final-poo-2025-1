package com.concreteware.clientes.service;

import com.concreteware.core.model.Pedido;
import java.util.List;

public interface PedidoClienteService {
    List<Pedido> listarPedidosCliente(String idCliente, String idPlanta);
    Pedido obtenerPedidoPorId(String idPedido, String idPlanta);
    Pedido modificarCantidad(String idPedido, double nuevaCantidad, String idPlanta);
} 