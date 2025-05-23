package com.concreteware.seguridad.model;

import java.io.Serializable;

public abstract class Usuario implements Serializable {

    private String id; // UUID o generado internamente
    private String dni; // Documento de identidad
    private String nombre;
    private String telefono;
    private String email;
    private String username;
    private String password;
    private TipoUsuario tipoUsuario;
    private boolean activo;

    public Usuario(String id, String dni, String nombre, String telefono, String email,
                   String username, String password, TipoUsuario tipoUsuario, boolean activo) {
        this.id = id;
        this.dni = dni;
        this.nombre = nombre;
        this.telefono = telefono;
        this.email = email;
        this.username = username;
        this.password = password;
        this.tipoUsuario = tipoUsuario;
        this.activo = activo;
    }

    public String getId() {
        return id;
    }

    public String getDni() {
        return dni;
    }

    public String getNombre() {
        return nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public String getEmail() {
        return email;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

    @Override
    public String toString() {
        return "Usuario{" +
                "id='" + id + '\'' +
                ", dni='" + dni + '\'' +
                ", nombre='" + nombre + '\'' +
                ", tipoUsuario=" + tipoUsuario +
                ", activo=" + activo +
                '}';
    }
}
