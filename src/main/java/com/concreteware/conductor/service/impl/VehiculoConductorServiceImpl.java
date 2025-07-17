package com.concreteware.conductor.service.impl;

import com.concreteware.conductor.service.VehiculoConductorService;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class VehiculoConductorServiceImpl implements VehiculoConductorService {
    @Override
    public String guardarChecklist(String idPlanta, String idVehiculo, String checklist) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentReference checklistRef = db.collection("plantas").document(idPlanta)
                    .collection("vehiculos").document(idVehiculo)
                    .collection("checklists").document();
            Map<String, Object> data = new HashMap<>();
            data.put("contenido", checklist);
            data.put("timestamp", System.currentTimeMillis());
            checklistRef.set(data);
            return "Checklist guardado";
        } catch (Exception e) {
            throw new RuntimeException("Error al guardar checklist", e);
        }
    }
} 