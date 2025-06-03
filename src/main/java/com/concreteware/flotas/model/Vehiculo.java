package com.concreteware.flotas.model;

public class Vehiculo {

    private String placa; // Clave única del vehículo
    private String marca;
    private String modelo;
    private int capacidadCargaM3;
    private boolean disponible;

    public Vehiculo(String placa, String marca, String modelo, int capacidadCargaM3, boolean disponible) {
        this.placa = placa;
        this.marca = marca;
        this.modelo = modelo;
        this.capacidadCargaM3 = capacidadCargaM3;
        this.disponible = disponible;
    }

    public String getPlaca() {
        return placa;
    }

    public String getMarca() {
        return marca;
    }

    public String getModelo() {
        return modelo;
    }

    public int getCapacidadCargaM3() {
        return capacidadCargaM3;
    }

    public boolean isDisponible() {
        return disponible;
    }

    public void setDisponible(boolean disponible) {
        this.disponible = disponible;
    }

    @Override
    public String toString() {
        return "Vehiculo{" +
                "placa='" + placa + '\'' +
                ", marca='" + marca + '\'' +
                ", modelo='" + modelo + '\'' +
                ", capacidadCargaM3=" + capacidadCargaM3 +
                ", disponible=" + disponible +
                '}';
    }
}
