package com.concreteware.pedidos.model;

import com.concreteware.pedidos.Producto;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Pedido {

    private String idPedido; // Clave única del pedido
    private String dniCliente;
    private String idObra;
    private List<Producto> productosSolicitados;
    private double volumenM3;
    private LocalDate fechaEntrega;
    private String placaVehiculoAsignado;

    public Pedido(String idPedido, String dniCliente, String idObra, List<Producto> productosSolicitados,
                  double volumenM3, LocalDate fechaEntrega, String placaVehiculoAsignado) {
        this.idPedido = idPedido;
        this.dniCliente = dniCliente;
        this.idObra = idObra;
        this.productosSolicitados = productosSolicitados != null ? productosSolicitados : new ArrayList<>();
        this.volumenM3 = volumenM3;
        this.fechaEntrega = fechaEntrega;
        this.placaVehiculoAsignado = placaVehiculoAsignado;
    }

    public String getIdPedido() {
        return idPedido;
    }

    public String getDniCliente() {
        return dniCliente;
    }

    public String getIdObra() {
        return idObra;
    }

    public List<Producto> getProductosSolicitados() {
        return productosSolicitados;
    }

    public void setProductosSolicitados(List<Producto> productosSolicitados) {
        this.productosSolicitados = productosSolicitados;
    }

    public double getVolumenM3() {
        return volumenM3;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public String getPlacaVehiculoAsignado() {
        return placaVehiculoAsignado;
    }

    public void setPlacaVehiculoAsignado(String placaVehiculoAsignado) {
        this.placaVehiculoAsignado = placaVehiculoAsignado;
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido='" + idPedido + '\'' +
                ", dniCliente='" + dniCliente + '\'' +
                ", idObra='" + idObra + '\'' +
                ", productosSolicitados=" + productosSolicitados.size() +
                ", volumenM3=" + volumenM3 +
                ", fechaEntrega=" + fechaEntrega +
                ", placaVehiculoAsignado='" + placaVehiculoAsignado + '\'' +
                '}';
    }
}