package com.concreteware.models;

public class Conductor extends Usuario {
    private String licencia;
    private String vehiculoAsignado;

    public Conductor(int id, String nombre) {
        super();
    }

    public Conductor(String id, String dni, String nombre, String correo, String tipo, boolean activo, String licencia, String vehiculoAsignado) {
        super(id, dni, nombre, correo, tipo, activo);
        this.licencia = licencia;
        this.vehiculoAsignado = vehiculoAsignado;
    }

    public String getLicencia() {
        return licencia;
    }

    public void setLicencia(String licencia) {
        this.licencia = licencia;
    }

    public String getVehiculoAsignado() {
        return vehiculoAsignado;
    }

    public void setVehiculoAsignado(String vehiculoAsignado) {
        this.vehiculoAsignado = vehiculoAsignado;
    }
}
