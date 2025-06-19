package com.concreteware.common.enums;

public enum EstadoPedido {
    PENDIENTE,      // Pedido creado pero no procesado
    CARGANDO,       // Mezcladora cargando concreto en planta
    EN_CAMINO,      // En tránsito hacia la obra
    ENTREGADO,      // Ya fue entregado
    CANCELADO       // Cancelado por cualquier motivo
}
