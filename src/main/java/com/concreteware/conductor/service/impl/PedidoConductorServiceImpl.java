package com.concreteware.conductor.service.impl;

import com.concreteware.conductor.service.PedidoConductorService;
import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.Ubicacion;
import com.concreteware.common.enums.EstadoPedido;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PedidoConductorServiceImpl implements PedidoConductorService {
    private static final String COLLECTION_NAME = "pedidos";

    @Override
    public List<Pedido> listarPedidosAsignados(String idConductor, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        List<Pedido> pedidos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME)
                    .whereEqualTo("idConductor", idConductor).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                pedidos.add(doc.toObject(Pedido.class));
            }
            return pedidos;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar pedidos asignados", e);
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
    public Pedido cambiarEstadoPedido(String idPedido, String nuevoEstado, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference pedidoRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idPedido);
        try {
            DocumentSnapshot doc = pedidoRef.get().get();
            if (!doc.exists()) {
                throw new RuntimeException("Pedido no encontrado");
            }
            Pedido pedido = doc.toObject(Pedido.class);
            EstadoPedido estado = EstadoPedido.valueOf(nuevoEstado);
            pedido.setEstado(estado);
            ApiFuture<WriteResult> future = pedidoRef.set(pedido);
            future.get();
            return pedido;
        } catch (Exception e) {
            throw new RuntimeException("Error al cambiar el estado del pedido", e);
        }
    }

    @Override
    public Pedido actualizarUbicacion(String idPedido, Ubicacion ubicacion, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference pedidoRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idPedido);
        try {
            DocumentSnapshot doc = pedidoRef.get().get();
            if (!doc.exists()) {
                throw new RuntimeException("Pedido no encontrado");
            }
            Pedido pedido = doc.toObject(Pedido.class);
            pedido.setUbicacionActual(ubicacion);
            ApiFuture<WriteResult> future = pedidoRef.set(pedido);
            future.get();
            return pedido;
        } catch (Exception e) {
            throw new RuntimeException("Error al actualizar la ubicación del pedido", e);
        }
    }

    @Override
    public String subirEvidencia(String idPedido, MultipartFile archivo, String idPlanta) {
        // TODO: Implementar lógica de almacenamiento de archivos (Firebase Storage, etc.)
        // Por ahora, solo retorna un mensaje de stub
        return "Evidencia subida (stub)";
    }
} 