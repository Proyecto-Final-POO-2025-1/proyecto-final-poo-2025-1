package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ClienteAdminService;
import com.concreteware.core.model.Cliente;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/clientes")
public class ClienteAdminController {

    private final ClienteAdminService clienteService;

    @Autowired
    public ClienteAdminController(ClienteAdminService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public Cliente crearCliente(@RequestBody Cliente cliente) {
        return clienteService.crearCliente(cliente);
    }

    @GetMapping
    public List<Cliente> obtenerTodos() {
        return clienteService.listarClientes();
    }

    @GetMapping("/{id}")
    public Cliente obtenerPorId(@PathVariable String id) {
        return clienteService.obtenerClientePorId(id);
    }

    @PutMapping("/{id}")
    public Cliente actualizar(@RequestBody Cliente clienteActualizado) {
        return clienteService.actualizarCliente(clienteActualizado);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id) {
        clienteService.eliminarCliente(id);
    }
}

