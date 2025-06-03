package com.concreteware.clientes.repository;

import com.concreteware.clientes.model.Cliente;
import com.concreteware.clientes.model.Obra;

import java.util.List;

public interface ClienteRepository {

    void guardar(Cliente cliente);

    Cliente buscarPorDni(String dni);

    boolean existeCliente(String dni);

    void eliminarPorDni(String dni);

    List<Cliente> listarTodos();

    List<Cliente> listarClientesActivos();

    void agregarObra(String dniCliente, Obra obra);

    void reemplazarObras(String dniCliente, List<Obra> nuevasObras);

    List<Obra> listarObrasPorCliente(String dniCliente);

    void actualizarContacto(String dni, String nuevoEmail, String nuevoTelefono);

}
