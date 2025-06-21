package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Pedido;
import com.concreteware.common.enums.EstadoPedido;

public interface PedidoAdminService {
    String crearPedido(Pedido pedido);
    Pedido obtenerPedidoPorId(String idPedido);
    List<Pedido> listarPedidos();
    void actualizarEstadoPedido(String idPedido, EstadoPedido nuevoEstado);
    void asignarConductorYPedido(String idPedido, String idConductor);
}
