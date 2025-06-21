package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ConductorAdminService;
import com.concreteware.core.model.Conductor;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ConductorAdminServiceImpl implements ConductorAdminService {

    private static final String COLLECTION_NAME = "conductores";

    @Override
    public String crearConductor(Conductor conductor) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        conductor.setId(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(conductor);
        try {
            result.get();
            return docRef.getId();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al crear conductor", e);
        }
    }

    @Override
    public Conductor obtenerConductorPorId(String idConductor) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(idConductor);
        ApiFuture<DocumentSnapshot> future = docRef.get();
        try {
            DocumentSnapshot doc = future.get();
            if (doc.exists()) {
                return doc.toObject(Conductor.class);
            } else {
                return null;
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener conductor", e);
        }
    }

    @Override
    public List<Conductor> listarConductores() {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
        List<Conductor> conductores = new ArrayList<>();
        try {
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                Conductor c = doc.toObject(Conductor.class);
                conductores.add(c);
            }
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar conductores", e);
        }
        return conductores;
    }

    @Override
    public Conductor actualizarConductor(Conductor conductor) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(conductor.getId()).set(conductor);
        try {
            future.get();
            return conductor;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar conductor", e);
        }
    }

    @Override
    public void eliminarConductor(String idConductor) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(idConductor).delete();
        try {
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al eliminar conductor", e);
        }
    }
}

