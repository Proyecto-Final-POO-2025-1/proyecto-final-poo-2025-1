package com.concreteware.administrador.service;

import com.concreteware.core.model.Cliente;
import java.util.List;
import com.concreteware.administrador.dto.ClienteConPasswordDTO;

public interface ClienteAdminService {
    ClienteConPasswordDTO crearCliente(Cliente cliente, String idPlanta);
    void eliminarCliente(String idCliente, String idPlanta);
    Cliente obtenerClientePorId(String idCliente, String idPlanta);
    List<Cliente> listarClientes(String idPlanta);
    Cliente actualizarCliente(Cliente cliente, String idPlanta);
}
