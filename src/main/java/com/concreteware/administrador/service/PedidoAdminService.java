package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Pedido;
import com.concreteware.common.enums.EstadoPedido;

public interface PedidoAdminService {
    String crearPedido(Pedido pedido, String idPlanta);
    Pedido obtenerPedidoPorId(String idPedido, String idPlanta);
    List<Pedido> listarPedidos(String idPlanta);
    void actualizarEstadoPedido(String idPedido, EstadoPedido nuevoEstado, String idPlanta);
    void asignarConductorYPedido(String idPedido, String idConductor, String idPlanta);
}
