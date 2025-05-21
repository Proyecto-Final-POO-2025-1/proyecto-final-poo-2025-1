package com.concreteware.models;

public class Pedido {
    private String id;
    private String clienteId;
    private String conductorId;
    private String vehiculoId;
    private String tipoConcretoId;
    private double volumenM3;
    private String fechaEntrega;
    private String direccionEntrega;
    private String estado;
    private String observaciones;

    public Pedido() {}

    public Pedido(String id, String clienteId, String conductorId, String vehiculoId, String tipoConcretoId,
                  double volumenM3, String fechaEntrega, String direccionEntrega, String estado, String observaciones) {
        this.id = id;
        this.clienteId = clienteId;
        this.conductorId = conductorId;
        this.vehiculoId = vehiculoId;
        this.tipoConcretoId = tipoConcretoId;
        this.volumenM3 = volumenM3;
        this.fechaEntrega = fechaEntrega;
        this.direccionEntrega = direccionEntrega;
        this.estado = estado;
        this.observaciones = observaciones;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getClienteId() {
        return clienteId;
    }

    public void setClienteId(String clienteId) {
        this.clienteId = clienteId;
    }

    public String getConductorId() {
        return conductorId;
    }

    public void setConductorId(String conductorId) {
        this.conductorId = conductorId;
    }

    public String getVehiculoId() {
        return vehiculoId;
    }

    public void setVehiculoId(String vehiculoId) {
        this.vehiculoId = vehiculoId;
    }

    public String getTipoConcretoId() {
        return tipoConcretoId;
    }

    public void setTipoConcretoId(String tipoConcretoId) {
        this.tipoConcretoId = tipoConcretoId;
    }

    public double getVolumenM3() {
        return volumenM3;
    }

    public void setVolumenM3(double volumenM3) {
        this.volumenM3 = volumenM3;
    }

    public String getFechaEntrega() {
        return fechaEntrega;
    }

    public void setFechaEntrega(String fechaEntrega) {
        this.fechaEntrega = fechaEntrega;
    }

    public String getDireccionEntrega() {
        return direccionEntrega;
    }

    public void setDireccionEntrega(String direccionEntrega) {
        this.direccionEntrega = direccionEntrega;
    }

    public String getEstado() {
        return estado;
    }

    public void setEstado(String estado) {
        this.estado = estado;
    }

    public String getObservaciones() {
        return observaciones;
    }

    public void setObservaciones(String observaciones) {
        this.observaciones = observaciones;
    }
}
