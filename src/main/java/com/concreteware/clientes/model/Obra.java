package com.concreteware.clientes.model;

import com.concreteware.common.enums.EstadoObra;

import java.time.LocalDate;

public class Obra {

    private String idObra;
    private String nombreObra;
    private String direccion;
    private String municipio;
    private Ubicacion ubicacion;
    private EstadoObra estado;
    private LocalDate fechaInicio;
    private LocalDate fechaFin;

    public Obra(String idObra, String nombreObra, String direccion, String municipio,
                Ubicacion ubicacion, EstadoObra estado, LocalDate fechaInicio, LocalDate fechaFin) {
        this.idObra = idObra;
        this.nombreObra = nombreObra;
        this.direccion = direccion;
        this.municipio = municipio;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.fechaInicio = fechaInicio;
        this.fechaFin = fechaFin;
    }

    public String getIdObra() {
        return idObra;
    }

    public String getNombreObra() {
        return nombreObra;
    }

    public String getDireccion() {
        return direccion;
    }

    public String getMunicipio() {
        return municipio;
    }

    public Ubicacion getUbicacion() {
        return ubicacion;
    }

    public EstadoObra getEstado() {
        return estado;
    }

    public LocalDate getFechaInicio() {
        return fechaInicio;
    }

    public LocalDate getFechaFin() {
        return fechaFin;
    }

    public void setEstado(EstadoObra estado) {
        this.estado = estado;
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