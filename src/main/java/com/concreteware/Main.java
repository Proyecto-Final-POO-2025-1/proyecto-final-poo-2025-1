package com.concreteware;
import com.concreteware.config.FirebaseInitializer;
import com.google.firebase.database.DatabaseReference;


import java.io.FileInputStream;
import java.io.IOException;
import com.concreteware.models.*;

public class Main {
    public static void main(String[] args) {


        // ======= ADMIN =======
        Usuario admin = new Usuario(
                "admin01",
                "12345678",
                "Yaneth Admin",
                "admin@concreteware.com",
                "ADMIN",
                true
        );

        // ======= CLIENTE =======
        Cliente cliente = new Cliente(
                "cliente02",
                "11323344",
                "Carlos Cliente",
                "cliente@obras.com",
                "CLIENTE",
                true,
                "Obras Concretas S.A.S",
                "Calle 100 #20-30"
        );
        DatabaseReference ref = FirebaseInitializer.getDatabase().getReference("usuarios");
        ref.child(cliente.getId()).setValueAsync(cliente);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }


        System.out.println("Cliente subido a Firebase con ID: " + cliente.getId());
        // ======= CONDUCTOR =======
        Conductor conductor = new Conductor(
                "conductor01",
                "55667788",
                "Luis Conductor",
                "luis@mixer.com",
                "CONDUCTOR",
                true,
                "Licencia C2",
                "Mixer"
        );

        // ======= TIPO CONCRETO =======
        TipoConcreto tipoConcreto = new TipoConcreto(
                "concreto01",
                3000,
                "impermeable, acelerado",
                "3/4",
                9.5f,  // asentamiento en pulgadas
                "Concreto 3000 PSI Rápido"
        );
        DatabaseReference ref2 = FirebaseInitializer.getDatabase().getReference("tipos_concreto");
        ref2.child(tipoConcreto.getId()).setValueAsync(tipoConcreto);
        try {
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
            // ======= VEHÍCULO =======
            Vehiculo vehiculo = new Vehiculo(
                    "vehiculo01",
                    "XYZ-123",
                    "Mixer",
                    "conductor01"
            );

            // ======= PEDIDO =======
            Pedido pedido = new Pedido(
                    "pedido01",
                    "cliente01",
                    "conductor01",
                    "vehiculo01",
                    "concreto01",
                    7.5,
                    "2025-05-20T08:00:00",
                    "Obra #1, Avenida Central",
                    "PENDIENTE",
                    "Entrega matutina"
            );

            // ======= Impresión de prueba =======
            System.out.println("ADMIN: " + admin.getNombre() + " - DNI: " + admin.getDni());
            System.out.println("CLIENTE: " + cliente.getNombre() + " - DNI: " + cliente.getDni());
            System.out.println("CONDUCTOR: " + conductor.getNombre() + " - DNI: " + conductor.getDni());
            System.out.println("TIPO CONCRETO: " + tipoConcreto.getDescripcionComercial() + " (" + tipoConcreto.getAsentamientoInches() + " in)");
            System.out.println("VEHÍCULO: " + vehiculo.getPlaca() + " - Tipo: " + vehiculo.getTipo());
            System.out.println("PEDIDO: " + pedido.getId() + " - Estado: " + pedido.getEstado());
        }

}
