package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Obra;

public interface ObraAdminService {
        String crearObra(Obra obra, String idPlanta);
        void eliminarObra(String idObra, String idPlanta);
        Obra obtenerObraPorId(String idObra, String idPlanta);
        List<Obra> listarObras(String idCliente, String idPlanta);
        Obra actualizarObra(Obra obra, String idPlanta);
}

