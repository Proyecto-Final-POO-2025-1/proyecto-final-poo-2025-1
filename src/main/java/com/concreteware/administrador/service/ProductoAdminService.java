package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Producto;

public interface ProductoAdminService {
    String crearProducto(Producto producto);
    void eliminarProducto(String idProducto);
    Producto obtenerProductoPorId(String idProducto);
    List<Producto> listarProductos();
    Producto actualizarProducto(Producto producto);
}
