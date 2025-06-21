package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Obra;

public interface ObraAdminService {
        String crearObra(Obra obra);
        void eliminarObra(String idObra);
        Obra obtenerObraPorId(String idObra);
        List<Obra> listarObras(String idCliente);
        Obra actualizarObra(Obra obra);
}

