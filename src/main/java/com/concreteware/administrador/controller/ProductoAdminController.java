package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ProductoAdminService;
import com.concreteware.core.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/{idPlanta}/administrador/productos")
public class ProductoAdminController {

    private final ProductoAdminService productoService;

    @Autowired
    public ProductoAdminController(ProductoAdminService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public String crearProducto(@RequestBody Producto producto, @PathVariable String idPlanta) {
        return productoService.crearProducto(producto, idPlanta);
    }

    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable String id, @PathVariable String idPlanta) {
        return productoService.obtenerProductoPorId(id, idPlanta);
    }

    @GetMapping
    public List<Producto> listarProductos(@PathVariable String idPlanta) {
        return productoService.listarProductos(idPlanta);
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable String id, @RequestBody Producto producto, @PathVariable String idPlanta) {
        producto.setIdProducto(id);
        return productoService.actualizarProducto(producto, idPlanta);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable String id, @PathVariable String idPlanta) {
        productoService.eliminarProducto(id, idPlanta);
    }
}

