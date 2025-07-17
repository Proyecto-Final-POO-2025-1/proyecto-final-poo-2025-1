package com.concreteware.conductor.service.impl;

import com.concreteware.conductor.service.NovedadConductorService;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class NovedadConductorServiceImpl implements NovedadConductorService {
    @Override
    public String reportarNovedad(String idPlanta, String idPedido, String descripcion) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentReference novedadRef = db.collection("plantas").document(idPlanta)
                    .collection("pedidos").document(idPedido)
                    .collection("novedades").document();
            Map<String, Object> data = new HashMap<>();
            data.put("descripcion", descripcion);
            data.put("timestamp", System.currentTimeMillis());
            novedadRef.set(data);
            return "Novedad reportada";
        } catch (Exception e) {
            throw new RuntimeException("Error al reportar novedad", e);
        }
    }
} 