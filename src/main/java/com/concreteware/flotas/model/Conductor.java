package com.concreteware.flotas.model;

import com.concreteware.seguridad.usuario.TipoUsuario;
import com.concreteware.seguridad.usuario.Usuario;

public class Conductor extends Usuario {

    private Vehiculo vehiculo;

    public Conductor(String id, String dni, String nombre, String telefono, String email,
                     String username, String password, boolean activo) {
        super(id, dni, nombre, telefono, email, username, password, TipoUsuario.CONDUCTOR, activo);
        this.vehiculo = null;
    }

    public void setVehiculo(Vehiculo vehiculo) {
        this.vehiculo = vehiculo;
    }

    public Vehiculo getVehiculo() {
        return vehiculo;
    }

    @Override
    public String toString() {
        return super.toString() + ", placaVehiculoAsignado='" + vehiculo.getPlaca() + "'}";
    }
}

