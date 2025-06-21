package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ClienteAdminService;
import com.concreteware.core.model.Cliente;
import com.concreteware.config.FirebaseInitializer;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ClienteAdminServiceImpl implements ClienteAdminService {

    private static final String COLLECTION_NAME = "clientes";

    @Override
    public Cliente crearCliente(Cliente cliente) {
        Firestore db = FirebaseInitializer.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        cliente.setId(docRef.getId());
        ApiFuture<WriteResult> result = docRef.set(cliente);
        try {
            result.get(); // Esperar escritura
            return cliente;
        } catch (Exception e) {
            throw new RuntimeException("Error al crear cliente", e);
        }
    }

    @Override
    public void eliminarCliente(String idCliente) {
        Firestore db = FirebaseInitializer.getFirestore();
        db.collection(COLLECTION_NAME).document(idCliente).delete();
    }

    @Override
    public Cliente obtenerClientePorId(String idCliente) {
        Firestore db = FirebaseInitializer.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document(idCliente);
        try {
            DocumentSnapshot snapshot = docRef.get().get();
            return snapshot.exists() ? snapshot.toObject(Cliente.class) : null;
        } catch (Exception e) {
            throw new RuntimeException("Error al obtener cliente", e);
        }
    }

    @Override
    public List<Cliente> listarClientes() {
        Firestore db = FirebaseInitializer.getFirestore();
        List<Cliente> clientes = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                clientes.add(doc.toObject(Cliente.class));
            }
            return clientes;
        } catch (Exception e) {
            throw new RuntimeException("Error al listar clientes", e);
        }
    }

    @Override
    public Cliente actualizarCliente(Cliente cliente) {
        Firestore db = FirebaseInitializer.getFirestore();
        db.collection(COLLECTION_NAME).document(cliente.getId()).set(cliente);
        return cliente;
    }
}
