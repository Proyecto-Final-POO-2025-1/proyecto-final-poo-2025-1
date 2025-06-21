package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.VehiculoAdminService;
import com.concreteware.core.model.Vehiculo;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class VehiculoAdminServiceImpl implements VehiculoAdminService {

    private static final String COLLECTION_NAME = "vehiculos";

    @Override
    public String crearVehiculo(Vehiculo vehiculo) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        vehiculo.setIdVehiculo(docRef.getId());
        ApiFuture<WriteResult> future = docRef.set(vehiculo);
        try {
            future.get();
            return docRef.getId();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al crear vehículo", e);
        }
    }

    @Override
    public Vehiculo obtenerVehiculoPorId(String idVehiculo) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(idVehiculo);
        try {
            DocumentSnapshot doc = docRef.get().get();
            return doc.exists() ? doc.toObject(Vehiculo.class) : null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener vehículo", e);
        }
    }

    @Override
    public List<Vehiculo> listarVehiculos() {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
        List<Vehiculo> vehiculos = new ArrayList<>();
        try {
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                vehiculos.add(doc.toObject(Vehiculo.class));
            }
            return vehiculos;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar vehículos", e);
        }
    }

    @Override
    public Vehiculo actualizarVehiculo(Vehiculo vehiculo) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME).document(vehiculo.getIdVehiculo()).set(vehiculo);
        try {
            future.get();
            return vehiculo;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar vehículo", e);
        }
    }

    @Override
    public void eliminarVehiculo(String idVehiculo) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(idVehiculo).delete();
    }
}
