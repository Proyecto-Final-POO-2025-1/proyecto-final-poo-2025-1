package com.concreteware.models;

public class TipoConcreto {
    private String id;
    private int resistenciaPsi;
    private String caracteristicas;
    private String tamañoGrava;
    private float asentamientoInches;
    private String descripcionComercial;

    public TipoConcreto() {}

    public TipoConcreto(String id, int resistenciaPsi, String caracteristicas, String tamañoGrava, float asentamientoInches, String descripcionComercial) {
        this.id = id;
        this.resistenciaPsi = resistenciaPsi;
        this.caracteristicas = caracteristicas;
        this.tamañoGrava = tamañoGrava;
        this.asentamientoInches = asentamientoInches;
        this.descripcionComercial = descripcionComercial;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getResistenciaPsi() {
        return resistenciaPsi;
    }

    public void setResistenciaPsi(int resistenciaPsi) {
        this.resistenciaPsi = resistenciaPsi;
    }

    public String getCaracteristicas() {
        return caracteristicas;
    }

    public void setCaracteristicas(String caracteristicas) {
        this.caracteristicas = caracteristicas;
    }

    public String getTamañoGrava() {
        return tamañoGrava;
    }

    public void setTamañoGrava(String tamañoGrava) {
        this.tamañoGrava = tamañoGrava;
    }

    public float getAsentamientoInches() {
        return asentamientoInches;
    }

    public void setAsentamientoInches(float asentamientoInches) {
        this.asentamientoInches = asentamientoInches;
    }

    public String getDescripcionComercial() {
        return descripcionComercial;
    }

    public void setDescripcionComercial(String descripcionComercial) {
        this.descripcionComercial = descripcionComercial;
    }
}
