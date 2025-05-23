package com.concreteware.flotas.model;

import com.concreteware.seguridad.model.TipoUsuario;
import com.concreteware.seguridad.model.Usuario;

public class Conductor extends Usuario {

    private String placaVehiculoAsignado;

    public Conductor(String id, String dni, String nombre, String telefono, String email,
                     String username, String password, boolean activo, String placaVehiculoAsignado) {
        super(id, dni, nombre, telefono, email, username, password, TipoUsuario.CONDUCTOR, activo);
        this.placaVehiculoAsignado = placaVehiculoAsignado;
    }

    public String getPlacaVehiculoAsignado() {
        return placaVehiculoAsignado;
    }

    public void setPlacaVehiculoAsignado(String placaVehiculoAsignado) {
        this.placaVehiculoAsignado = placaVehiculoAsignado;
    }

    @Override
    public String toString() {
        return super.toString() + ", placaVehiculoAsignado='" + placaVehiculoAsignado + "'}";
    }
}

