package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ClienteAdminService;
import com.concreteware.administrador.service.PlantaAdminService;
import com.concreteware.core.model.Cliente;
import com.concreteware.config.FirebaseInitializer;
import com.concreteware.core.model.Planta;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class PlantaAdminServiceImpl implements PlantaAdminService {

    public List<Planta>listarPlantas() {
        Firestore db = FirestoreClient.getFirestore();
        List<Planta> plantas = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection("plantas").get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                plantas.add(doc.toObject(Planta.class));
            }
            return plantas;
        } catch (Exception e) {
            throw new RuntimeException("Error al listar clientes", e);
        }
    }
}