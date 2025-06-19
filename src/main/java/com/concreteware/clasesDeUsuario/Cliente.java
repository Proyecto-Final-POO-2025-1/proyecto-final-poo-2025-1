package com.concreteware.clasesDeUsuario;

import com.concreteware.common.enums.NivelAcceso;
import com.concreteware.seguridad.usuario.TipoUsuario;
import com.concreteware.seguridad.usuario.Usuario;

import java.util.ArrayList;
import java.util.List;

public class Cliente extends Usuario {

    private List<Obra> obrasAsignadas;

    public Cliente(String id, String dni, String nombre, String telefono, String email,
                   String username, String password, boolean activo) {
        super(id, dni, nombre, telefono, email, username, password, TipoUsuario.CLIENTE, activo);
        this.obrasAsignadas = new ArrayList<>();
    }

    public List<Obra> getObrasAsignadas() {
        return obrasAsignadas;
    }

    public void setObrasAsignadas(List<Obra> obrasAsignadas) {
        this.obrasAsignadas = obrasAsignadas;
    }

    public void agregarObra(Obra obra) {
        this.obrasAsignadas.add(obra);
    }

    public void eliminarObra(Obra obra) {
        this.obrasAsignadas.remove(obra);
    }

    @Override
    public String toString() {
        return super.toString() + ", obrasAsignadas=" + obrasAsignadas.size() + " obras" + '}';
    }
}