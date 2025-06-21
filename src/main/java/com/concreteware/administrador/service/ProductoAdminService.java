package com.concreteware.administrador.service;

import java.util.List;
import com.concreteware.core.model.Producto;

public interface ProductoAdminService {
    String crearProducto(Producto producto, String idPlanta);
    void eliminarProducto(String idProducto, String idPlanta);
    Producto obtenerProductoPorId(String idProducto, String idPlanta);
    List<Producto> listarProductos(String idPlanta);
    Producto actualizarProducto(Producto producto, String idPlanta);
}
