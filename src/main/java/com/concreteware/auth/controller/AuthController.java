package com.concreteware.auth.controller;

import com.concreteware.auth.dto.*;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseToken;
import com.google.firebase.auth.UserRecord;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/{idPlanta}/auth")
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> verificarToken(@RequestBody TokenRequest request, @PathVariable String idPlanta) {
        try {
            FirebaseToken decodedToken = FirebaseAuth.getInstance().verifyIdToken(request.getIdToken());
            String uid = decodedToken.getUid();
            String email = decodedToken.getEmail();

            // 🔍 Obtener tipoUsuario desde Firestore
            Firestore db = FirestoreClient.getFirestore();
            DocumentSnapshot snapshot = db.collection("plantas").document(idPlanta).collection("usuarios").document(uid).get().get();

            if (!snapshot.exists()) {
                return ResponseEntity.status(404).body("Usuario no encontrado en base de datos");
            }

            String tipoUsuario = snapshot.getString("tipoUsuario");

            AuthenticatedUserDTO user = new AuthenticatedUserDTO(uid, email, tipoUsuario);
            return ResponseEntity.ok(user);

        } catch (Exception e) {
            return ResponseEntity.status(401).body("Token inválido o error: " + e.getMessage());
        }
    }


    @PostMapping("/register")
    public ResponseEntity<?> registrarUsuario(@RequestBody RegistroRequest request, @PathVariable String idPlanta) {
        try {
            // 1. Crear usuario en Firebase Auth
            UserRecord.CreateRequest userRequest = new UserRecord.CreateRequest()
                    .setEmail(request.getEmail())
                    .setPassword(request.getPassword());

            UserRecord userRecord = FirebaseAuth.getInstance().createUser(userRequest);

            // 2. Guardar tipoUsuario en Firestore (opcional, pero recomendado)
            Firestore db = FirestoreClient.getFirestore();
            db.collection("plantas").document(idPlanta).collection("usuarios").document(userRecord.getUid())
                    .set(Map.of(
                            "email", request.getEmail(),
                            "tipoUsuario", request.getTipoUsuario()
                    ));

            return ResponseEntity.ok("Usuario creado con UID: " + userRecord.getUid());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al registrar: " + e.getMessage());
        }
    }

    @PostMapping("/setup-existing")
    public ResponseEntity<?> configurarUsuarioExistente(@RequestBody SetupExistingUserRequest request, @PathVariable String idPlanta) {
        try {
            // Obtener el usuario existente de Firebase Auth
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(request.getEmail());
            
            // Guardar tipoUsuario en Firestore
            Firestore db = FirestoreClient.getFirestore();
            db.collection("plantas").document(idPlanta).collection("usuarios").document(userRecord.getUid())
                    .set(Map.of(
                            "email", request.getEmail(),
                            "tipoUsuario", request.getTipoUsuario()
                    ));

            return ResponseEntity.ok("Usuario configurado con UID: " + userRecord.getUid());
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al configurar usuario: " + e.getMessage());
        }
    }

    @GetMapping("/check-user/{email}")
    public ResponseEntity<?> verificarUsuario(@PathVariable String email, @PathVariable String idPlanta) {
        try {
            // Obtener el usuario de Firebase Auth
            UserRecord userRecord = FirebaseAuth.getInstance().getUserByEmail(email);
            
            // Verificar si existe en Firestore
            Firestore db = FirestoreClient.getFirestore();
            DocumentSnapshot snapshot = db.collection("plantas").document(idPlanta).collection("usuarios").document(userRecord.getUid()).get().get();

            if (snapshot.exists()) {
                String tipoUsuario = snapshot.getString("tipoUsuario");
                return ResponseEntity.ok(Map.of(
                    "exists", true,
                    "uid", userRecord.getUid(),
                    "email", email,
                    "tipoUsuario", tipoUsuario
                ));
            } else {
                return ResponseEntity.ok(Map.of(
                    "exists", false,
                    "uid", userRecord.getUid(),
                    "email", email,
                    "message", "Usuario existe en Firebase pero no en Firestore"
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error al verificar usuario: " + e.getMessage());
        }
    }

}


