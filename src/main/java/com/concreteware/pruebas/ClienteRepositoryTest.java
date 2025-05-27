package com.concreteware.pruebas;

import com.concreteware.clientes.model.Cliente;
import com.concreteware.clientes.model.Obra;
import com.concreteware.clientes.model.Ubicacion;
import com.concreteware.clientes.repository.ClienteRepository;
import com.concreteware.clientes.repository.impl.ClienteRepositoryFirebase;
import com.concreteware.common.enums.EstadoObra;
import com.concreteware.seguridad.usuario.TipoUsuario;
import com.google.firebase.database.DatabaseReference;

import java.time.LocalDate;
import java.util.List;
import java.util.Scanner;
import java.util.UUID;

public class ClienteRepositoryTest {
    public static void main(String[] args) {
        ClienteRepository repo = new ClienteRepositoryFirebase();
        Scanner scanner = new Scanner(System.in);

        while (true) {
            System.out.println("\n=== MENÚ DE PRUEBAS CLIENTE ===");
            System.out.println("1. Crear y guardar cliente");
            System.out.println("2. Buscar cliente por DNI");
            System.out.println("3. Actualizar contacto de cliente");
            System.out.println("4. Agregar obra a cliente");
            System.out.println("5. Listar obras de cliente");
            System.out.println("6. Eliminar cliente");
            System.out.println("0. Salir");
            System.out.print("Seleccione una opción: ");

            int opcion = Integer.parseInt(scanner.nextLine());
            if (opcion == 0) break;

            System.out.print("Ingrese el DNI del cliente: ");
            String dni = scanner.nextLine();

            switch (opcion) {
                case 1:
                    if (repo.existeCliente(dni)) {
                        System.out.println("Ya existe un cliente con ese DNI. No se puede guardar.");
                        break;
                    }
                    System.out.print("Nombre: ");
                    String nombre = scanner.nextLine();
                    System.out.print("Teléfono: ");
                    String telefono = scanner.nextLine();
                    System.out.print("Email: ");
                    String email = scanner.nextLine();
                    System.out.print("Username: ");
                    String username = scanner.nextLine();
                    System.out.print("Password: ");
                    String password = scanner.nextLine();

                    // Generar ID automáticamente
                    String id = UUID.randomUUID().toString();

                    Cliente nuevoCliente = new Cliente(
                            id, dni, nombre, telefono, email, username, password, true);
                    repo.guardar(nuevoCliente);
                    System.out.println("Cliente guardado exitosamente con ID: " + id);
                    break;

                case 2:
                    Cliente clienteEncontrado = repo.buscarPorDni(dni);
                    System.out.println((clienteEncontrado != null) ? clienteEncontrado : "No se encontró el cliente.");
                    break;

                case 3:
                    System.out.print("Nuevo Email: ");
                    String nuevoEmail = scanner.nextLine();
                    System.out.print("Nuevo Teléfono: ");
                    String nuevoTel = scanner.nextLine();
                    repo.actualizarContacto(dni, nuevoEmail, nuevoTel);
                    System.out.println("Contacto actualizado.");
                    break;

                case 4:
                    // Generar ID de obra automáticamente
                    String idObra = UUID.randomUUID().toString();
                    System.out.print("Nombre de obra: ");
                    String nombreObra = scanner.nextLine();
                    System.out.print("Dirección: ");
                    String direccion = scanner.nextLine();
                    System.out.print("Municipio: ");
                    String municipio = scanner.nextLine();
                    System.out.print("Latitud: ");
                    double lat = Double.parseDouble(scanner.nextLine());
                    System.out.print("Longitud: ");
                    double lon = Double.parseDouble(scanner.nextLine());
                    System.out.print("Estado (ACTIVA, FINALIZADA, SUSPENDIDA): ");
                    EstadoObra estado = EstadoObra.valueOf(scanner.nextLine().toUpperCase());
                    System.out.print("Fecha inicio (yyyy-MM-dd): ");
                    String fechaInicio = scanner.nextLine();
                    System.out.print("Fecha fin (yyyy-MM-dd): ");
                    String fechaFin = scanner.nextLine();

                    Obra nuevaObra = new Obra(
                            idObra, nombreObra, direccion, municipio,
                            new Ubicacion(lat, lon), estado,
                            LocalDate.parse(fechaInicio), LocalDate.parse(fechaFin)
                    );
                    repo.agregarObra(dni, nuevaObra);
                    System.out.println("Obra agregada al cliente con ID: " + idObra);
                    break;

                case 5:
                    List<Obra> obras = repo.listarObrasPorCliente(dni);
                    if (obras.isEmpty()) {
                        System.out.println("El cliente no tiene obras asignadas.");
                    } else {
                        obras.forEach(System.out::println);
                    }
                    break;

                case 6:
                    repo.eliminarPorDni(dni);
                    System.out.println("Cliente eliminado.");
                    break;

                default:
                    System.out.println("Opción inválida.");
            }
        }

        scanner.close();
        System.out.println("Programa finalizado.");
    }
}
