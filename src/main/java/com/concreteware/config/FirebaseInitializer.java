package com.concreteware.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.database.FirebaseDatabase;

import java.io.FileInputStream;
import java.io.IOException;

public class FirebaseInitializer {

    private static boolean initialized = false;

    public static void initialize() {
        if (!initialized) {
            try {
                FileInputStream serviceAccount = new FileInputStream("ServiceAccountKey.json");

                FirebaseOptions options = FirebaseOptions.builder()
                        .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                        .setDatabaseUrl("https://concreteware-default-rtdb.firebaseio.com/")
                        .build();

                FirebaseApp.initializeApp(options);
                initialized = true;
                System.out.println("Firebase inicializado correctamente.");

            } catch (IOException e) {
                System.err.println("Error al inicializar Firebase: " + e.getMessage());
            }
        }
    }

    public static FirebaseDatabase getDatabase() {
        initialize();
        return FirebaseDatabase.getInstance();
    }
}

