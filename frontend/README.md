# ConcreteWare Admin Frontend

Aplicación web responsiva para la administración del sistema ConcreteWare, construida con React, TypeScript y Tailwind CSS.

## Características

- 🔐 **Autenticación con Firebase**: Login seguro con Firebase Authentication
- 📱 **Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- 🎨 **UI Moderna**: Interfaz de usuario moderna con Tailwind CSS
- 🔄 **CRUD Completo**: Gestión completa de todas las entidades del sistema
- 📊 **Gestión de Estados**: Estados de pedidos, obras y vehículos
- 🔍 **Búsqueda en Tiempo Real**: Filtrado y búsqueda en todas las tablas
- 📝 **Formularios Intuitivos**: Formularios con validación y feedback visual

## Funcionalidades Implementadas

### 🔧 Gestión de Clientes
- Crear, editar, eliminar y listar clientes
- Información completa: NIT, empresa, contacto
- Búsqueda por nombre, empresa o email

### 🚛 Gestión de Conductores
- Gestión completa de conductores
- Información de licencias y fechas de vencimiento
- Estados: Activo, Inactivo, Suspendido

### 📦 Gestión de Productos
- Catálogo de productos con precios y stock
- Diferentes unidades de medida (m³, kg, l, unidad)
- Control de inventario con alertas visuales

### 🚚 Gestión de Vehículos
- Registro de vehículos con capacidad y estado
- Estados: Disponible, En uso, Mantenimiento, Fuera de servicio
- Información completa: Placa, marca, modelo

### 🏗️ Gestión de Obras
- Registro de obras por cliente
- Estados: Activa, Completada, Suspendida
- Fechas de inicio y fin

### 📋 Gestión de Pedidos
- Creación de pedidos con múltiples productos
- Asignación de conductores
- Control de estados: Pendiente, En proceso, En camino, Entregado, Cancelado
- Cálculo automático de totales

## Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS** - Framework de CSS utilitario
- **React Router** - Enrutamiento de la aplicación
- **Firebase** - Autenticación y backend
- **Axios** - Cliente HTTP para API
- **React Hook Form** - Gestión de formularios
- **React Hot Toast** - Notificaciones
- **Lucide React** - Iconos

## Instalación

### Prerrequisitos

- Node.js 16 o superior
- npm o yarn
- Backend Spring Boot ejecutándose en `http://localhost:8080`

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   cd frontend
   ```

2. **Instalar dependencias**
   ```bash
   npm install
   ```

3. **Configurar Firebase**
   
   Edita el archivo `src/firebase.ts` y reemplaza la configuración con tus credenciales de Firebase:
   
   ```typescript
   const firebaseConfig = {
     apiKey: "tu-api-key",
     authDomain: "tu-auth-domain",
     projectId: "tu-project-id",
     storageBucket: "tu-storage-bucket",
     messagingSenderId: "tu-messaging-sender-id",
     appId: "tu-app-id"
   };
   ```

4. **Configurar el Backend**
   
   Asegúrate de que tu backend Spring Boot esté ejecutándose en `http://localhost:8080` o modifica la URL en `src/services/api.ts`:
   
   ```typescript
   const API_BASE_URL = 'http://localhost:8080';
   ```

5. **Ejecutar la aplicación**
   ```bash
   npm start
   ```

   La aplicación se abrirá en `http://localhost:3000`

## Configuración del Backend

### CORS Configuration

Asegúrate de que tu backend Spring Boot tenga configurado CORS para permitir peticiones desde el frontend:

```java
@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:3000")
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
```

### Firebase Configuration

1. Crea un proyecto en [Firebase Console](https://console.firebase.google.com/)
2. Habilita Authentication con Email/Password
3. Configura Firestore Database
4. Descarga el archivo de configuración de servicio
5. Configura las credenciales en tu backend Spring Boot

## Estructura del Proyecto

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   └── Layout.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Clientes.tsx
│   │   ├── Conductores.tsx
│   │   ├── Productos.tsx
│   │   ├── Vehiculos.tsx
│   │   ├── Obras.tsx
│   │   └── Pedidos.tsx
│   ├── services/
│   │   └── api.ts
│   ├── types/
│   │   └── index.ts
│   ├── App.tsx
│   ├── index.tsx
│   ├── index.css
│   └── firebase.ts
├── package.json
├── tailwind.config.js
└── README.md
```

## Scripts Disponibles

- `npm start` - Ejecuta la aplicación en modo desarrollo
- `npm build` - Construye la aplicación para producción
- `npm test` - Ejecuta las pruebas
- `npm eject` - Expone la configuración de webpack (irreversible)

## Características de Seguridad

- **Autenticación JWT**: Tokens de Firebase para autenticación
- **Rutas Protegidas**: Acceso restringido a usuarios autenticados
- **Validación de Formularios**: Validación en cliente y servidor
- **Manejo de Errores**: Feedback visual para errores de API

## Responsive Design

La aplicación está optimizada para:
- 📱 **Móviles**: Navegación con menú hamburguesa
- 📱 **Tablets**: Layout adaptativo
- 💻 **Desktop**: Sidebar fijo con navegación completa

## Personalización

### Colores
Los colores se pueden personalizar en `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#eff6ff',
        // ... más tonos
        900: '#1e3a8a',
      }
    }
  }
}
```

### Componentes
Los estilos de componentes se pueden modificar en `src/index.css`:

```css
@layer components {
  .btn-primary {
    @apply bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200;
  }
}
```

## Troubleshooting

### Error de CORS
Si encuentras errores de CORS, verifica:
1. La configuración CORS en el backend
2. La URL del backend en `api.ts`
3. Que el backend esté ejecutándose

### Error de Firebase
Si hay problemas con Firebase:
1. Verifica las credenciales en `firebase.ts`
2. Asegúrate de que Authentication esté habilitado
3. Verifica las reglas de Firestore

### Error de Dependencias
Si hay problemas con las dependencias:
```bash
rm -rf node_modules package-lock.json
npm install
```

## Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Soporte

Para soporte técnico, contacta al equipo de desarrollo o crea un issue en el repositorio. 