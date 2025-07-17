package com.concreteware.clientes.service.impl;

import com.concreteware.clientes.service.PedidoClienteService;
import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.ProductoPedido;
import com.concreteware.common.enums.EstadoPedido;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PedidoClienteServiceImpl implements PedidoClienteService {
    private static final String COLLECTION_NAME = "pedidos";

    @Override
    public List<Pedido> listarPedidosCliente(String idCliente, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        List<Pedido> pedidos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME)
                    .whereEqualTo("idCliente", idCliente).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                pedidos.add(doc.toObject(Pedido.class));
            }
            return pedidos;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar pedidos del cliente", e);
        }
    }

    @Override
    public Pedido obtenerPedidoPorId(String idPedido, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentSnapshot doc = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idPedido).get().get();
            return doc.exists() ? doc.toObject(Pedido.class) : null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener el pedido", e);
        }
    }

    @Override
    public Pedido modificarCantidad(String idPedido, double nuevaCantidad, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference pedidoRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idPedido);
        try {
            DocumentSnapshot doc = pedidoRef.get().get();
            if (!doc.exists()) {
                throw new RuntimeException("Pedido no encontrado");
            }
            Pedido pedido = doc.toObject(Pedido.class);
            if (pedido.getEstado() != EstadoPedido.PENDIENTE) {
                throw new RuntimeException("Solo se puede modificar la cantidad si el pedido está en estado PENDIENTE");
            }
            // Suponemos que solo hay un producto por pedido (ajustar si hay varios)
            if (pedido.getProductos() != null && !pedido.getProductos().isEmpty()) {
                ProductoPedido producto = pedido.getProductos().get(0);
                producto.setCantidadM3(nuevaCantidad);
            } else {
                throw new RuntimeException("El pedido no tiene productos asociados");
            }
            // Actualizar en Firestore
            ApiFuture<WriteResult> future = pedidoRef.set(pedido);
            future.get();
            return pedido;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al modificar la cantidad del pedido", e);
        }
    }
} 