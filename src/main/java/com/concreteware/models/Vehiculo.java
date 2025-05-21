package com.concreteware.models;

public class Vehiculo {
    private String id;
    private String placa;
    private String tipo;
    private String conductorId;

    public Vehiculo() {}

    public Vehiculo(String id, String placa, String tipo, String conductorId) {
        this.id = id;
        this.placa = placa;
        this.tipo = tipo;
        this.conductorId = conductorId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPlaca() {
        return placa;
    }

    public void setPlaca(String placa) {
        this.placa = placa;
    }

    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }

    public String getConductorId() {
        return conductorId;
    }

    public void setConductorId(String conductorId) {
        this.conductorId = conductorId;
    }
}
