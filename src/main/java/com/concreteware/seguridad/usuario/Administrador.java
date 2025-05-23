package com.concreteware.seguridad.model;

import com.concreteware.common.enums.NivelAcceso;

public class Administrador extends Usuario {

    private NivelAcceso nivel;

    public Administrador(String id, String dni, String nombre, String telefono, String email,
                         String username, String password, boolean activo, NivelAcceso nivel) {
        super(id, dni, nombre, telefono, email, username, password, TipoUsuario.ADMINISTRADOR, activo);
        this.nivel = nivel;
    }

    public NivelAcceso getNivel() {
        return nivel;
    }

    public void setNivel(NivelAcceso nivel) {
        this.nivel = nivel;
    }

    @Override
    public String toString() {
        return super.toString() + ", nivel=" + nivel + '}';
    }
}

