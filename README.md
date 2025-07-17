# Concreteware

Sistema integral de gestión para empresas de producción y distribución de concreto.

## Descripción General
Concreteware es una plataforma fullstack diseñada para optimizar la administración de plantas de concreto, pedidos, flotas y la interacción entre los diferentes actores del proceso logístico (administradores, clientes y conductores). El sistema permite la gestión eficiente de operaciones, seguimiento en tiempo real y comunicación efectiva entre las partes.

## Funcionalidades Principales
- **Gestión de plantas, productos y clientes** (CRUD completo para administradores)
- **Gestión y seguimiento de pedidos** (creación, modificación, estados, historial)
- **Panel de cliente**: visualización de pedidos, mapa de conductores, soporte vía WhatsApp
- **Panel de conductor**: pedidos asignados, actualización de estado, checklist de vehículo, reporte de novedades, subida de evidencia
- **Mapa en tiempo real** de vehículos y conductores
- **Autenticación y control de acceso** por roles (Administrador, Cliente, Conductor)
- **Notificaciones y actualizaciones en tiempo real**

## Tecnologías Usadas
- **Backend:** Java 17, Spring Boot, Firebase Auth, Firestore, Maven
- **Frontend:** React 18, TypeScript, Tailwind CSS, React Router, Axios, Leaflet
- **Hosting:**
  - Backend: Azure App Service
  - Frontend: Firebase Hosting

## Instalación y Despliegue

### Backend
1. Clonar el repositorio y ubicarse en la carpeta raíz.
2. Configurar las credenciales de Firebase en `src/main/resources/application.properties`.
3. Compilar y ejecutar:
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```
4. Para desplegar en Azure, usar Azure CLI o el portal web.

### Frontend
1. Ir a la carpeta `frontend/`.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Ejecutar en desarrollo:
   ```bash
   npm run dev
   ```
4. Para desplegar en Firebase:
   ```bash
   npm run build
   firebase deploy
   ```

## Estructura de Carpetas
```
proyecto_final/
├── src/
│   ├── main/java/com/concreteware/...
│   └── main/resources/
├── frontend/
│   ├── src/
│   └── public/
├── documentacion.md
├── pom.xml
└── README.md
```

## Créditos
Proyecto desarrollado por el Grupo 3 para la materia Programación Orientada a Objetos, Universidad Nacional de Colombia.

---
Para más detalles técnicos y funcionales, consulte `documentacion.md`. 