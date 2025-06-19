package com.concreteware.clasesDeUsuario;

import com.concreteware.common.enums.EstadoObra;
import com.concreteware.pedidos.model.Pedido;
import org.checkerframework.checker.units.qual.C;

import java.time.LocalDate;
import java.util.List;
import java.util.ArrayList;

public class Obra {

    private String idObra;
    private String nombreObra;
    private String direccion;
    private String municipio;
    private Ubicacion ubicacion;
    private EstadoObra estado;
    private String fechaInicio;
    private List<Pedido> pedidos;
    private Cliente cliente;

    public Obra(String idObra, String nombreObra, String direccion, String municipio,
                Ubicacion ubicacion, EstadoObra estado, LocalDate fechaInicio, Cliente cliente) {
        this.idObra = idObra;
        this.nombreObra = nombreObra;
        this.direccion = direccion;
        this.municipio = municipio;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.fechaInicio = fechaInicio.toString() + "T00:00:00";
        this.cliente = cliente;
        this.pedidos = new ArrayList<>();
    }

    public String getIdObra() {
        return idObra;
    }

    public String getNombreObra() {
        return nombreObra;
    }

    public void setNombreObra(String nombreObra) {
        this.nombreObra = nombreObra;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public String getMunicipio() {
        return municipio;
    }

    public void setMunicipio(String municipio) {
        this.municipio = municipio;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public void setUbicacion(Ubicacion ubicacion) {
        this.ubicacion = ubicacion;
    }

    public EstadoObra getEstado() {
        return estado;
    }

    public void setEstado(EstadoObra estado) {
        this.estado = estado;
    }

    public String getFechaInicio() {
        return fechaInicio;
    }

    public void setFechaInicio(String fechaInicio) {
        this.fechaInicio = fechaInicio;
    }

    public List<Pedido> getPedidos() {
        return pedidos;
    }

    public void setPedidos(List<Pedido> pedidos) {
        this.pedidos = pedidos;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }

    public void agregarPedido(Pedido pedido) {
        this.pedidos.add(pedido);
    }

    public void eliminarPedido(Pedido pedido) {
        this.pedidos.remove(pedido);
    }

    @Override
    public String toString() {
        return "Obra{" +
                "idObra='" + idObra + '\'' +
                ", nombreObra='" + nombreObra + '\'' +
                ", municipio='" + municipio + '\'' +
                ", estado=" + estado +
                '}';
    }
}