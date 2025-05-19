package com.concreteware;

import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.*;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

public class Main {
    public static void main(String[] args) throws IOException, InterruptedException {
        // Inicializar Firebase
        FileInputStream serviceAccount = new FileInputStream("ServiceAccountKey.json");

        FirebaseOptions options = FirebaseOptions.builder()
                .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                .setDatabaseUrl("https://concreteware-default-rtdb.firebaseio.com")
                .build();

        FirebaseApp.initializeApp(options);
        DatabaseReference dbRef = FirebaseDatabase.getInstance().getReference("usuarios");

        // Crear usuario
        Map<String, Object> nuevoUsuario = new HashMap<>();
        nuevoUsuario.put("nombre", "Yaneth Sarmiento");
        nuevoUsuario.put("correo", "yaneth@concrecol.com");
        nuevoUsuario.put("tipo", "ADMIN");

        dbRef.push().setValueAsync(nuevoUsuario);
        System.out.println("Usuario creado.");

        // Leer usuarios
        dbRef.addListenerForSingleValueEvent(new ValueEventListener() {
            public void onDataChange(DataSnapshot snapshot) {
                System.out.println("=== Usuarios ===");
                for (DataSnapshot userSnap : snapshot.getChildren()) {
                    Map<String, Object> user = (Map<String, Object>) userSnap.getValue();
                    System.out.println(user);
                }
            }

            public void onCancelled(DatabaseError error) {
                System.out.println("Error al leer: " + error.getMessage());
            }
        });

        Thread.sleep(5000); // para esperar la respuesta
    }
}
