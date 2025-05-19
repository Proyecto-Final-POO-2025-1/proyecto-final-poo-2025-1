# 📄 CONVENTION.md – Convención de Ramas para Concreteware

## 🧭 Estructura de Ramas

Este proyecto utiliza una convención de ramas basada en Git Flow, adaptada para desarrollo modular y escalable de software para concreteras.

### 🔹 `main`
- Rama principal de producción.
- Contiene código estable, probado y listo para ser entregado o desplegado.
- **No se trabaja directamente aquí.**

### 🔹 `develop`
- Rama de integración.
- Aquí se integran todas las funcionalidades en desarrollo antes de pasar a producción.
- Punto de partida para ramas `feature/`, `fix/` y `release/`.

### 🔹 `feature/<nombre>`
- Para desarrollar nuevas funcionalidades o módulos.
- Se crea desde `develop`.

**Ejemplos:**
- `feature/autenticacion`
- `feature/api-ordenes`
- `feature/ubicacion-conductores`

```bash
git checkout develop
git checkout -b feature/<nombre>
```

### 🔹 `fix/<nombre>`
- Para corregir errores detectados en QA, staging o producción.
- También parte desde `develop`.

**Ejemplos:**
- `fix/validacion-usuario`
- `fix/conexion-firebase`

```bash
git checkout develop
git checkout -b fix/<nombre>
```

### 🔹 `release/vX.Y`
- Para preparar una entrega (versión estable).
- Se usa para pruebas finales antes de merge a `main`.

**Ejemplos:**
- `release/v1.0`
- `release/demo-hormitec`

```bash
git checkout develop
git checkout -b release/v1.0
```

### 🔹 `client/<nombre-cliente>`
- Para personalizaciones específicas por concretera.
- Se crea desde `main` y puede contener ajustes visuales, de configuración o comportamiento.

**Ejemplos:**
- `client/concrecol`
- `client/hormitec`

```bash
git checkout main
git checkout -b client/<nombre-cliente>
```

## ✅ Buenas prácticas

- Hacer `pull` antes de trabajar:  
  ```bash
  git pull origin develop
  ```

- Siempre hacer `merge` de `feature/` o `fix/` en `develop`, no en `main`.
- Hacer `merge` de `release/` en `main` y también en `develop` después.