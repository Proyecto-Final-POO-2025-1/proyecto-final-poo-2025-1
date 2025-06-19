package com.concreteware.controls.drivers;

import com.concreteware.models.*;

import java.util.*;

public class UsuarioManager {

    private Map<Integer, Usuario> usuarios = new HashMap<>();
    private int nextId = 1;

    // 2.1 Crear usuario por tipo
    public Usuario crearUsuario(String tipo, String nombre) {
        Usuario usuario;
        int id = nextId++;

        switch (tipo.toLowerCase()) {
            case "cliente":
                usuario = new Cliente(id, nombre);
                break;
            case "conductor":
                usuario = new Conductor(id, nombre);
                break;
            default:
                System.out.println("Tipo de usuario no reconocido.");
                return null;
        }

        usuarios.put(id, usuario);
        return usuario;
    }

    // 2.2 Imprimir un usuario por ID
    public Usuario obtenerUsuarioPorId(int id) {
        return usuarios.get(id);
    }

    // 2.3 Imprimir todos los usuarios por tipo
    public List<Usuario> obtenerUsuariosPorTipo(String tipo) {
        List<Usuario> resultado = new ArrayList<>();

        for (Usuario u : usuarios.values()) {
            if ((tipo.equalsIgnoreCase("cliente") && u instanceof Cliente) ||
                    (tipo.equalsIgnoreCase("conductor") && u instanceof Conductor)) {
                resultado.add(u);
            }
        }
        return resultado;
    }

    // 2.4 Imprimir todos los usuarios
    public List<Usuario> obtenerTodosLosUsuarios() {
        return new ArrayList<>(usuarios.values());
    }

    // 2.5 Eliminar un usuario existente
    public boolean eliminarUsuario(int id) {
        return usuarios.remove(id) != null;
    }

    // 2.6 Modificar un usuario existente
    public boolean modificarNombreUsuario(int id, String nuevoNombre) {
        Usuario u = usuarios.get(id);
        if (u != null) {
            u.setNombre(nuevoNombre);
            return true;
        }
        return false;
    }
}
