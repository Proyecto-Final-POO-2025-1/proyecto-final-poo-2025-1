package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ObraAdminService;
import com.concreteware.core.model.Obra;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ObraAdminServiceImpl implements ObraAdminService {

    private static final String COLLECTION_NAME = "obras";

    @Override
    public String crearObra(Obra obra, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document();
        obra.setIdObra(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(obra);
        try {
            result.get();
            return docRef.getId();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al crear obra", e);
        }
    }

    @Override
    public Obra obtenerObraPorId(String idObra, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idObra);
        try {
            DocumentSnapshot doc = docRef.get().get();
            return doc.exists() ? doc.toObject(Obra.class) : null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener obra", e);
        }
    }

    @Override
    public List<Obra> listarObras(String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference obrasRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME);

        ApiFuture<QuerySnapshot> future = obrasRef.get();

        List<Obra> obras = new ArrayList<>();
        try {
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                obras.add(doc.toObject(Obra.class));
            }
            return obras;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar obras", e);
        }
    }

    @Override
    public List<Obra> listarObras(String idCliente, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        CollectionReference obrasRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME);

        ApiFuture<QuerySnapshot> future = obrasRef.whereEqualTo("idCliente", idCliente).get();

        List<Obra> obras = new ArrayList<>();
        try {
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                obras.add(doc.toObject(Obra.class));
            }
            return obras;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar obras del cliente", e);
        }
    }

    @Override
    public Obra actualizarObra(Obra obra, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(obra.getIdObra()).set(obra);
        try {
            future.get();
            return obra;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar obra", e);
        }
    }

    @Override
    public void eliminarObra(String idObra, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idObra).delete();
    }
}
