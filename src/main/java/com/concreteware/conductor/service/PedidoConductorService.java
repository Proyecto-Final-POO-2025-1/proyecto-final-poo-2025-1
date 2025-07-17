package com.concreteware.conductor.service;

import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.Ubicacion;
import org.springframework.web.multipart.MultipartFile;
import java.util.List;

public interface PedidoConductorService {
    List<Pedido> listarPedidosAsignados(String idConductor, String idPlanta);
    Pedido obtenerPedidoPorId(String idPedido, String idPlanta);
    Pedido cambiarEstadoPedido(String idPedido, String nuevoEstado, String idPlanta);
    Pedido actualizarUbicacion(String idPedido, Ubicacion ubicacion, String idPlanta);
    String subirEvidencia(String idPedido, MultipartFile archivo, String idPlanta);
} 