# 🚀 Instrucciones de Uso - ConcreteWare Admin

## 📋 Resumen del Proyecto

Este proyecto incluye:
- **Backend**: Spring Boot con Firebase y Firestore
- **Frontend**: React + TypeScript + Tailwind CSS
- **Autenticación**: Firebase Authentication
- **Base de Datos**: Firestore (NoSQL)

## 🛠️ Configuración Inicial

### 1. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto llamado "concreteware"
3. Habilita Authentication con Email/Password
4. Crea una base de datos Firestore
5. Configura las reglas de Firestore:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 2. Configurar el Backend

1. **Descargar credenciales de Firebase:**
   - En Firebase Console → Configuración del proyecto → Cuentas de servicio
   - Descarga el archivo JSON de la cuenta de servicio
   - Colócalo en `src/main/resources/firebase-service-account.json`

2. **Configurar application.properties:**
   ```properties
   # Firebase
   firebase.service-account.path=classpath:firebase-service-account.json
   
   # Server
   server.port=8080
   ```

3. **Ejecutar el backend:**
   ```bash
   # En el directorio raíz del proyecto
   mvn spring-boot:run
   ```

### 3. Configurar el Frontend

1. **Navegar al directorio frontend:**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Configurar Firebase (ya está configurado):**
   El archivo `src/firebase.ts` ya tiene las credenciales configuradas.

4. **Ejecutar el frontend:**
   ```bash
   npm start
   ```

## 🌐 Acceso a la Aplicación

- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:8080

## 👤 Crear Usuario Administrador

### Opción 1: Desde Firebase Console
1. Ve a Firebase Console → Authentication → Users
2. Haz clic en "Add User"
3. Ingresa email y contraseña
4. En Firestore, crea el documento del usuario:
   ```
   plantas/{idPlanta}/usuarios/{uid}
   {
     "email": "admin@concreteware.com",
     "tipoUsuario": "ADMIN"
   }
   ```

### Opción 2: Desde la API
```bash
curl -X POST http://localhost:8080/{idPlanta}/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@concreteware.com",
    "password": "password123",
    "tipoUsuario": "ADMIN"
  }'
```

## 📱 Funcionalidades Disponibles

### 🔐 Autenticación
- Login con email/password
- Selección de planta
- Sesión persistente
- Logout automático

### 👥 Gestión de Clientes
- ✅ Crear cliente con NIT y empresa
- ✅ Editar información de contacto
- ✅ Eliminar clientes
- ✅ Búsqueda por nombre/empresa

### 🚛 Gestión de Conductores
- ✅ Registrar conductores
- ✅ Gestión de licencias
- ✅ Estados: Activo/Inactivo/Suspendido
- ✅ Asignación a pedidos

### 📦 Gestión de Productos
- ✅ Catálogo de productos
- ✅ Control de stock
- ✅ Múltiples unidades (m³, kg, l)
- ✅ Precios y descripciones

### 🚚 Gestión de Vehículos
- ✅ Registro de vehículos
- ✅ Estados: Disponible/En uso/Mantenimiento
- ✅ Capacidad y placa
- ✅ Marca y modelo

### 🏗️ Gestión de Obras
- ✅ Crear obras por cliente
- ✅ Estados: Activa/Completada/Suspendida
- ✅ Fechas de inicio y fin
- ✅ Dirección de la obra

### 📋 Gestión de Pedidos
- ✅ Crear pedidos con múltiples productos
- ✅ Asignar conductores
- ✅ Control de estados completo
- ✅ Cálculo automático de totales

## 🔧 Solución de Problemas

### Error de CORS
```bash
# Verificar que el backend esté ejecutándose
curl http://localhost:8080/actuator/health
```

### Error de Firebase
1. Verificar credenciales en `firebase.ts`
2. Verificar que Authentication esté habilitado
3. Verificar reglas de Firestore

### Error de Dependencias
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Error de Compilación
```bash
# Limpiar cache
cd frontend
npm run build
```

## 📊 Estructura de Datos

### Plantas
```
plantas/{idPlanta}/
├── clientes/{idCliente}
├── conductores/{idConductor}
├── productos/{idProducto}
├── vehiculos/{idVehiculo}
├── obras/{idObra}
├── pedidos/{idPedido}
└── usuarios/{uid}
```

### Relaciones
- **Clientes** → **Obras** (1:N)
- **Pedidos** → **Productos** (N:M)
- **Pedidos** → **Conductores** (N:1)
- **Pedidos** → **Vehículos** (N:1)

## 🎯 Flujo de Trabajo Típico

1. **Crear Cliente** → Registrar empresa y contacto
2. **Crear Obra** → Asociar al cliente
3. **Registrar Productos** → Catálogo disponible
4. **Registrar Conductores** → Personal disponible
5. **Registrar Vehículos** → Flota disponible
6. **Crear Pedido** → Seleccionar cliente, obra, productos
7. **Asignar Conductor** → Al pedido
8. **Actualizar Estados** → Seguimiento del pedido

## 🔒 Seguridad

- **Autenticación**: Firebase Auth
- **Autorización**: Basada en tipo de usuario
- **Validación**: Cliente y servidor
- **CORS**: Configurado para desarrollo

## 📱 Responsive Design

- **Mobile**: Menú hamburguesa, tablas con scroll
- **Tablet**: Layout adaptativo
- **Desktop**: Sidebar fijo, tablas completas

## 🚀 Despliegue

### Backend (Heroku/Google Cloud)
```bash
mvn clean package
java -jar target/concreteware-0.0.1-SNAPSHOT.jar
```

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Subir carpeta build
```

## 📞 Soporte

Para problemas técnicos:
1. Verificar logs del navegador (F12)
2. Verificar logs del backend
3. Consultar documentación en `README_FRONTEND.md`
4. Crear issue en el repositorio

---

**🎉 ¡Sistema listo para usar!**

El sistema ConcreteWare Admin está completamente funcional con todas las características de gestión empresarial implementadas. 