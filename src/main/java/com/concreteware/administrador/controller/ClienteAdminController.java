package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ClienteAdminService;
import com.concreteware.core.model.Cliente;
import com.concreteware.administrador.dto.ClienteConPasswordDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/clientes")
public class ClienteAdminController {

    private final ClienteAdminService clienteService;

    @Autowired
    public ClienteAdminController(ClienteAdminService clienteService) {
        this.clienteService = clienteService;
    }

    @PostMapping
    public ClienteConPasswordDTO crearCliente(@RequestBody Cliente cliente, @PathVariable String idPlanta) {
        return clienteService.crearCliente(cliente, idPlanta);
    }

    @GetMapping
    public List<Cliente> obtenerTodos(@PathVariable String idPlanta) {
        return clienteService.listarClientes(idPlanta);
    }

    @GetMapping("/{id}")
    public Cliente obtenerPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return clienteService.obtenerClientePorId(id, idPlanta);
    }

    @PutMapping("/{id}")
    public Cliente actualizar(@RequestBody Cliente clienteActualizado, @PathVariable String id, @PathVariable String idPlanta) {
        clienteActualizado.setId(id);
        return clienteService.actualizarCliente(clienteActualizado, idPlanta);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable String id, @PathVariable String idPlanta) {
        clienteService.eliminarCliente(id, idPlanta);
    }
}

