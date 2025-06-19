package com.concreteware.models;

public class Cliente extends Usuario {
    private String empresa;
    private String direccion;

    public Cliente(int id, String nombre) {
        super();
    }

    public Cliente(String id, String dni, String nombre, String correo, String tipo, boolean activo, String empresa, String direccion) {
        super(id, dni, nombre, correo, tipo, activo);
        this.empresa = empresa;
        this.direccion = direccion;
    }

    public String getEmpresa() {
        return empresa;
    }

    public void setEmpresa(String empresa) {
        this.empresa = empresa;
    }

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }
}
