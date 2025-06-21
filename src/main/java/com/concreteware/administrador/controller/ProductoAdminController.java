package com.concreteware.administrador.controller;

import com.concreteware.administrador.service.ProductoAdminService;
import com.concreteware.core.model.Producto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/administrador/productos")
public class ProductoAdminController {

    private final ProductoAdminService productoService;

    @Autowired
    public ProductoAdminController(ProductoAdminService productoService) {
        this.productoService = productoService;
    }

    @PostMapping
    public String crearProducto(@RequestBody Producto producto) {
        return productoService.crearProducto(producto);
    }

    @GetMapping("/{id}")
    public Producto obtenerProductoPorId(@PathVariable String id) {
        return productoService.obtenerProductoPorId(id);
    }

    @GetMapping
    public List<Producto> listarProductos() {
        return productoService.listarProductos();
    }

    @PutMapping("/{id}")
    public Producto actualizarProducto(@PathVariable String id, @RequestBody Producto producto) {
        producto.setIdProducto(id);
        return productoService.actualizarProducto(producto);
    }

    @DeleteMapping("/{id}")
    public void eliminarProducto(@PathVariable String id) {
        productoService.eliminarProducto(id);
    }
}

