package com.concreteware.administrador.service;

import com.concreteware.core.model.Cliente;
import java.util.List;

public interface ClienteAdminService {
    Cliente crearCliente(Cliente cliente);
    void eliminarCliente(String idCliente);
    Cliente obtenerClientePorId(String idCliente);
    List<Cliente> listarClientes();
    Cliente actualizarCliente(Cliente cliente);
}
