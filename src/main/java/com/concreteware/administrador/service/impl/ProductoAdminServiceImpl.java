package com.concreteware.administrador.service.impl;

import com.concreteware.administrador.service.ProductoAdminService;
import com.concreteware.core.model.Producto;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@Service
public class ProductoAdminServiceImpl implements ProductoAdminService {

    private static final String COLLECTION_NAME = "productos";

    @Override
    public String crearProducto(Producto producto) {
        Firestore db = FirestoreClient.getFirestore();
        DocumentReference docRef = db.collection(COLLECTION_NAME).document();
        producto.setIdProducto(docRef.getId());
        ApiFuture<WriteResult> future = docRef.set(producto);
        try {
            future.get();
            return docRef.getId();
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al crear producto", e);
        }
    }

    @Override
    public Producto obtenerProductoPorId(String id) {
        Firestore db = FirestoreClient.getFirestore();
        try {
            DocumentSnapshot doc = db.collection(COLLECTION_NAME).document(id).get().get();
            return doc.exists() ? doc.toObject(Producto.class) : null;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al obtener producto", e);
        }
    }

    @Override
    public List<Producto> listarProductos() {
        Firestore db = FirestoreClient.getFirestore();
        List<Producto> productos = new ArrayList<>();
        try {
            ApiFuture<QuerySnapshot> future = db.collection(COLLECTION_NAME).get();
            for (DocumentSnapshot doc : future.get().getDocuments()) {
                productos.add(doc.toObject(Producto.class));
            }
            return productos;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al listar productos", e);
        }
    }

    @Override
    public Producto actualizarProducto(Producto producto) {
        Firestore db = FirestoreClient.getFirestore();
        ApiFuture<WriteResult> future = db.collection(COLLECTION_NAME)
                .document(producto.getIdProducto()).set(producto);
        try {
            future.get();
            return producto;
        } catch (InterruptedException | ExecutionException e) {
            throw new RuntimeException("Error al actualizar producto", e);
        }
    }

    @Override
    public void eliminarProducto(String id) {
        Firestore db = FirestoreClient.getFirestore();
        db.collection(COLLECTION_NAME).document(id).delete();
    }
}
