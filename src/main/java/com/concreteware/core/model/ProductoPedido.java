package com.concreteware.core.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductoPedido {

    private String idProducto;        // Referencia al producto base
    private double cantidadM3;        // Cantidad solicitada de ese producto
    private double precioUnitario;    // Precio final ajustado para este pedido
    private String observaciones;     // Observaciones específicas si aplica

    public ProductoPedido() {
    }

    public ProductoPedido(String idProducto, double cantidadM3, double precioUnitario, String observaciones) {
        this.idProducto = idProducto;
        this.cantidadM3 = cantidadM3;
        this.precioUnitario = precioUnitario;
        this.observaciones = observaciones;
    }
}
