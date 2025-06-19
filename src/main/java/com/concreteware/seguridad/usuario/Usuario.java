package com.concreteware.seguridad.usuario;

import com.concreteware.common.enums.NivelAcceso;

import java.io.*;

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

    public String getId() {
        return id;
    }

    public String getDni() {
        return dni;
    }

    public void setDni(String dni) {
        this.dni = dni;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public TipoUsuario getTipoUsuario() {
        return tipoUsuario;
    }

    public void setTipoUsuario(TipoUsuario tipoUsuario) {
        this.tipoUsuario = tipoUsuario;
    }

    public boolean isActivo() {
        return activo;
    }

    public void setActivo(boolean activo) {
        this.activo = activo;
    }

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
