package com.concreteware.clientes.service.impl;

import com.concreteware.clientes.service.UbicacionConductorService;
import com.concreteware.core.model.Pedido;
import com.concreteware.core.model.Ubicacion;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

@Service
public class UbicacionConductorServiceImpl implements UbicacionConductorService {
    @Override
    public Ubicacion obtenerUbicacionConductor(String idPlanta, String idPedido) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            // Obtener el pedido
            DocumentSnapshot pedidoDoc = db.collection("plantas").document(idPlanta)
                    .collection("pedidos").document(idPedido).get().get();
            if (!pedidoDoc.exists()) {
                throw new RuntimeException("Pedido no encontrado");
            }
            Pedido pedido = pedidoDoc.toObject(Pedido.class);
            String idConductor = pedido.getIdConductor();
            if (idConductor == null || idConductor.isEmpty()) {
                throw new RuntimeException("El pedido no tiene conductor asignado");
            }
            // Obtener la ubicación actual del conductor
            DocumentSnapshot conductorDoc = db.collection("plantas").document(idPlanta)
                    .collection("conductores").document(idConductor).get().get();
            if (!conductorDoc.exists()) {
                throw new RuntimeException("Conductor no encontrado");
            }
            // Se asume que el documento del conductor tiene un campo ubicacionActual
            return conductorDoc.contains("ubicacionActual") ? conductorDoc.toObject(com.concreteware.core.model.Conductor.class).getUbicacionActual() : null;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener la ubicación del conductor", e);
        }
    }
} 