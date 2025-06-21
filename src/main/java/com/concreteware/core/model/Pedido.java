package com.concreteware.core.model;

import com.concreteware.common.enums.EstadoPedido;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Pedido {

    private String idPedido;
    private String idCliente;
    private String idObra;
    private String idVehiculo;
    private String idConductor;

    private List<ProductoPedido> productos; // Lista de productos por pedido

    private String fechaEntrega; // formato YYYY-MM-DD
    private String horaEntrega;  // formato HH:mm
    private EstadoPedido estado;
    private Ubicacion ubicacionActual;
}
