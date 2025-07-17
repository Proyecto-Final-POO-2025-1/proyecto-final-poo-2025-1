package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ClienteAdminService;
import com.concreteware.core.model.Cliente;
import com.concreteware.config.FirebaseInitializer;
import com.concreteware.common.utils.PasswordUtils;
import com.concreteware.common.utils.EmailService;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.UserRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.concreteware.administrador.dto.ClienteConPasswordDTO;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@Service
public class ClienteAdminServiceImpl implements ClienteAdminService {

    private static final String COLLECTION_NAME = "clientes";

    @Autowired
    private EmailService emailService;

    @Override
    public ClienteConPasswordDTO crearCliente(Cliente cliente, String idPlanta) {
        Firestore db = FirebaseInitializer.getFirestore();
        try {
            // 1. Generar contraseña aleatoria
            String password = PasswordUtils.generateRandomPassword();

            // 2. Crear usuario en Firebase Auth
            UserRecord.CreateRequest userRequest = new UserRecord.CreateRequest()
                    .setEmail(cliente.getEmail())
                    .setPassword(password);
            UserRecord userRecord = FirebaseAuth.getInstance().createUser(userRequest);

            // 3. Guardar en Firestore (colección usuarios)
            db.collection("plantas").document(idPlanta).collection("usuarios").document(userRecord.getUid())
                    .set(Map.of(
                            "email", cliente.getEmail(),
                            "tipoUsuario", "CLIENTE"
                    ));

            // 4. Guardar en colección clientes usando el uid de Firebase como id
            DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(userRecord.getUid());
            cliente.setId(userRecord.getUid());
            ApiFuture<WriteResult> result = docRef.set(cliente);
            result.get(); // Esperar escritura

            // 5. Preparar DTO con cliente y contraseña
            ClienteConPasswordDTO dto = new ClienteConPasswordDTO();
            dto.setCliente(cliente);
            dto.setPassword(password);
            return dto;
        } catch (Exception e) {
            throw new RuntimeException("Error al crear cliente", e);
        }
    }

    @Override
    public void eliminarCliente(String idCliente, String idPlanta) {
        Firestore db = FirebaseInitializer.getFirestore();
        db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idCliente).delete();
    }

    @Override
    public Cliente obtenerClientePorId(String idCliente, String idPlanta) {
        Firestore db = FirebaseInitializer.getFirestore();
        DocumentReference docRef = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(idCliente);
        try {
            DocumentSnapshot snapshot = docRef.get().get();
            return snapshot.exists() ? snapshot.toObject(Cliente.class) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener cliente", e);
        }
    }

    @Override
    public List<Cliente> listarClientes(String idPlanta) {
        Firestore db = FirebaseInitializer.getFirestore();
        List<Cliente> clientes = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                clientes.add(doc.toObject(Cliente.class));
            }
            return clientes;
        } catch (Exception e) {
            throw new RuntimeException("Error al listar clientes", e);
        }
    }

    @Override
    public Cliente actualizarCliente(Cliente cliente, String idPlanta) {
        Firestore db = FirebaseInitializer.getFirestore();
        db.collection("plantas").document(idPlanta).collection(COLLECTION_NAME).document(cliente.getId()).set(cliente);
        return cliente;
    }
}
