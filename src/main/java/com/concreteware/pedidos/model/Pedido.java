package com.concreteware.pedidos.model;

import com.concreteware.clasesDeUsuario.Cliente;
import com.concreteware.clasesDeUsuario.Obra;
import com.concreteware.flotas.model.Vehiculo;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

public class Pedido {

    private String idPedido; // Clave única del pedido
    private Cliente cliente;
    private Obra obra;
    private List<Producto> productosSolicitados;
    private double volumenM3;
    private LocalDate fechaEntrega;
    private Vehiculo vehiculo;

    public Pedido(String idPedido, Cliente cliente, Obra obra, LocalDate fechaEntrega, Double volumenM3) {
        this.idPedido = idPedido;
        this.cliente = cliente;
        this.obra = obra;
        this.productosSolicitados = new ArrayList<>();
        this.volumenM3 = volumenM3;
        this.fechaEntrega = fechaEntrega;
        this.vehiculo = null; // Vehículo asignado inicialmente es nulo

    }

    public String getIdPedido() {
        return idPedido;
    }

    public void setIdPedido(String idPedido) {
        this.idPedido = idPedido;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public Obra getObra() {
        return obra;
    }

    public void setObra(Obra obra) {
        this.obra = obra;
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

    public void setVolumenM3(double volumenM3) {
        this.volumenM3 = volumenM3;
    }

    public LocalDate getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(LocalDate fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public void agregarProducto(Producto producto) {
        this.productosSolicitados.add(producto);
    }

    public void eliminarProducto(Producto producto) {
        this.productosSolicitados.remove(producto);
    }

    @Override
    public String toString() {
        return "Pedido{" +
                "idPedido='" + idPedido + '\'' +
                ", dniCliente='" + cliente.getDni() + '\'' +
                ", idObra='" + obra.getNombreObra() + '\'' +
                ", volumenM3=" + volumenM3 +
                ", fechaEntrega=" + fechaEntrega +
                ", vehiculo=" + (vehiculo != null ? vehiculo.getPlaca() : "No asignado") +
                '}';
    }
}