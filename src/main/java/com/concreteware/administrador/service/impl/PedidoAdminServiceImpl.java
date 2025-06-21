package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.PedidoAdminService;
import com.concreteware.core.model.Pedido;
import com.concreteware.common.enums.EstadoPedido;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PedidoAdminServiceImpl implements PedidoAdminService {

    private static final String COLLECTION_NAME = "pedidos";

    @Override
    public String crearPedido(Pedido pedido) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        pedido.setIdPedido(docRef.getId());
        ApiFuture<WriteResult> future = docRef.set(pedido);
        try {
            future.get();
            return docRef.getId();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al crear el pedido", e);
        }
    }

    @Override
    public Pedido obtenerPedidoPorId(String idPedido) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentSnapshot doc = db.collection(COLLECTION_NAME).document(idPedido).get().get();
            return doc.exists() ? doc.toObject(Pedido.class) : null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener el pedido", e);
        }
    }

    @Override
    public List<Pedido> listarPedidos() {
        Firestore db = FirestoreClient.getFirestore();
        List<Pedido> pedidos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                pedidos.add(doc.toObject(Pedido.class));
            }
            return pedidos;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar pedidos", e);
        }
    }

    @Override
    public void actualizarEstadoPedido(String idPedido, EstadoPedido nuevoEstado) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME)
                .document(idPedido)
                .update("estado", nuevoEstado.name());
        try {
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar estado del pedido", e);
        }
    }

    @Override
    public void asignarConductorYPedido(String idPedido, String idConductor) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME)
                .document(idPedido)
                .update("idConductor", idConductor);
        try {
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al asignar conductor al pedido", e);
        }
    }
}
