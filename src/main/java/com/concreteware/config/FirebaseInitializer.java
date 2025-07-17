package com.concreteware.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Firestore;
import jakarta.annotation.PostConstruct;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseInitializer {

    @PostConstruct
    public void initialize() {
        try {
            String firebaseConfigJson = System.getenv("FIREBASE_CONFIG");

            if (firebaseConfigJson == null || firebaseConfigJson.isEmpty()) {
                throw new RuntimeException("La variable de entorno FIREBASE_CONFIG no está definida");
            }

            InputStream serviceAccount = new ByteArrayInputStream(firebaseConfigJson.getBytes(StandardCharsets.UTF_8));

            FirebaseOptions options = FirebaseOptions.builder()
                    .setCredentials(GoogleCredentials.fromStream(serviceAccount))
                    .build();

            if (FirebaseApp.getApps().isEmpty()) {
                FirebaseApp.initializeApp(options);
                System.out.println("✅ Firebase inicializado correctamente.");
            }

        } catch (Exception e) {
            throw new RuntimeException("❌ Error inicializando Firebase", e);
        }
    }

    public static Firestore getFirestore() {
        return FirestoreClient.getFirestore();
    }
}

