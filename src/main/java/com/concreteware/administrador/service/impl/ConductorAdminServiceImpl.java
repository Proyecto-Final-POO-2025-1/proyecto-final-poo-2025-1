package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ConductorAdminService;
import com.concreteware.core.model.Conductor;
import com.concreteware.common.utils.PasswordUtils;
import com.concreteware.common.utils.EmailService;
import com.concreteware.administrador.dto.ConductorConPasswordDTO;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class ConductorAdminServiceImpl implements ConductorAdminService {

    private static final String COLLECTION_NAME = "conductores";

    @Autowired
    private EmailService emailService;

    @Override
    public ConductorConPasswordDTO crearConductor(Conductor conductor, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            // 1. Generar contraseña aleatoria
            String password = PasswordUtils.generateRandomPassword();

            // 2. Crear usuario en Firebase Auth
            UserRecord.CreateRequest userRequest = new UserRecord.CreateRequest()
                    .setEmail(conductor.getEmail())
                    .setPassword(password);
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(userRequest);

            // 3. Guardar en Firestore (colección usuarios)
            db.collection("plantas").document(idPlanta).collection("usuarios").document(userRecord.getUid())
                    .set(Map.of(
                            "email", conductor.getEmail(),
                            "tipoUsuario", "CONDUCTOR"
                    ));

            // 4. Guardar en colección conductores usando el uid de Firebase como id
            DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(userRecord.getUid());
            conductor.setId(userRecord.getUid());
            ApiFuture<WriteResult> result = docRef.set(conductor);
            result.get();
            ConductorConPasswordDTO dto = new ConductorConPasswordDTO();
            dto.setConductor(conductor);
            dto.setPassword(password);
            return dto;
        } catch (Exception e) {
            throw new RuntimeException("Error al crear conductor", e);
        }
    }

    @Override
    public Conductor obtenerConductorPorId(String idConductor, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idConductor);
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
    public List<Conductor> listarConductores(String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<QuerySnapshot> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).get();
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
    public Conductor actualizarConductor(Conductor conductor, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(conductor.getId()).set(conductor);
        try {
            future.get();
            return conductor;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar conductor", e);
        }
    }

    @Override
    public void eliminarConductor(String idConductor, String idPlanta) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idConductor).delete();
        try {
            future.get();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al eliminar conductor", e);
        }
    }
}

