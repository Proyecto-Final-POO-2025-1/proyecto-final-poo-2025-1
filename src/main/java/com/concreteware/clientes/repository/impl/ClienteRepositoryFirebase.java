package com.concreteware.clientes.repository.impl;

import com.concreteware.clientes.model.Cliente;
import com.concreteware.clientes.model.Obra;
import com.concreteware.clientes.repository.ClienteRepository;
import com.google.firebase.database.DatabaseReference;
import com.concreteware.config.FirebaseInitializer;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;

public class ClienteRepositoryFirebase implements ClienteRepository {

    private final DatabaseReference clientesRef;
    private final ConcurrentMap<String, Cliente> cacheClientes;

    public ClienteRepositoryFirebase() {
        this.clientesRef = FirebaseInitializer.getDatabase().getReference().child("clientes");
        this.cacheClientes = new ConcurrentHashMap<>();
    }

    @Override
    public void guardar(Cliente cliente) {
        clientesRef.child(cliente.getDni()).setValueAsync(cliente);
        cacheClientes.put(cliente.getDni(), cliente);
    }

    @Override
    public Cliente buscarPorDni(String dni) {
        return cacheClientes.get(dni);
    }

    @Override
    public boolean existeCliente(String dni) {
        return cacheClientes.containsKey(dni);
    }

    @Override
    public void eliminarPorDni(String dni) {
        clientesRef.child(dni).removeValueAsync();
        cacheClientes.remove(dni);
    }

    @Override
    public List<Cliente> listarTodos() {
        return new ArrayList<>(cacheClientes.values());
    }

    @Override
    public List<Cliente> listarClientesActivos() {
        List<Cliente> activos = new ArrayList<>();
        for (Cliente c : cacheClientes.values()) {
            if (c.isActivo()) {
                activos.add(c);
            }
        }
        return activos;
    }

    @Override
    public void agregarObra(String dniCliente, Obra obra) {
        Cliente cliente = cacheClientes.get(dniCliente);
        if (cliente != null) {
            cliente.agregarObra(obra);
            guardar(cliente);
        }
    }

    @Override
    public void reemplazarObras(String dniCliente, List<Obra> nuevasObras) {
        Cliente cliente = cacheClientes.get(dniCliente);
        if (cliente != null) {
            cliente.setObrasAsignadas(nuevasObras);
            guardar(cliente);
        }
    }

    @Override
    public List<Obra> listarObrasPorCliente(String dniCliente) {
        Cliente cliente = cacheClientes.get(dniCliente);
        return (cliente != null) ? cliente.getObrasAsignadas() : Collections.emptyList();
    }

    @Override
    public void actualizarContacto(String dni, String nuevoEmail, String nuevoTelefono) {
        Cliente cliente = cacheClientes.get(dni);
        if (cliente != null) {
            cliente.setEmail(nuevoEmail);
            cliente.setTelefono(nuevoTelefono);
            guardar(cliente);
        }
    }
}

