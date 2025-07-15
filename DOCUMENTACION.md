# DOCUMENTACION

## 1. Introducción
Concreteware es una plataforma integral para la gestión de plantas de concreto premezclado, diseñada para digitalizar y optimizar la administración de clientes, obras, productos, vehículos, conductores y pedidos. El sistema busca resolver los retos logísticos y operativos de la industria, facilitando la trazabilidad, el control de inventario y la asignación eficiente de recursos, todo bajo un entorno seguro, moderno y escalable.

## 2. Propósito
El propósito de Concreteware es ofrecer una solución tecnológica robusta y flexible que permita a las empresas de concreto centralizar y automatizar sus procesos operativos. El sistema está pensado para mejorar la eficiencia, reducir errores humanos, aumentar la transparencia y brindar herramientas de análisis y control en tiempo real, impactando positivamente la productividad y la satisfacción de los clientes.

## 3. Alcance del producto
Concreteware abarca la gestión completa de la operación de una planta de concreto, desde la autenticación de usuarios hasta la entrega de pedidos y la administración de recursos. El sistema está compuesto por un frontend web responsivo y un backend robusto, integrados mediante una API REST y autenticación segura con Firebase.

### 3.1. Análisis de requisitos
El sistema debe permitir:
- Autenticación y autorización de usuarios con diferentes roles (administrador, operador, conductor, cliente).
- Gestión CRUD de clientes, conductores, productos, vehículos, obras y pedidos.
- Asignación de conductores y vehículos a pedidos.
- Visualización geográfica de obras, vehículos y pedidos.
- Búsqueda y filtrado avanzado en todas las entidades.
- Validación y feedback visual en formularios.
- Notificaciones y manejo de errores.
- Seguridad en el acceso y manipulación de datos.

### 3.2. Diseño y arquitectura
Concreteware está basado en una arquitectura cliente-servidor:
- **Frontend:** SPA desarrollada en React + TypeScript, con Tailwind CSS para el diseño y Firebase para autenticación.
- **Backend:** API REST en Java (Spring Boot), integración con Firebase Admin SDK y Firestore como base de datos.
- **Comunicación:** Axios para peticiones HTTP, tokens JWT para autenticación.
- **Despliegue:** Firebase Hosting para frontend, backend desplegable en cualquier servidor Java.

El diseño sigue principios de separación de responsabilidades, reutilización de componentes y escalabilidad. Los modelos de datos están alineados entre frontend y backend para evitar inconsistencias.

### 3.3. Programación
El desarrollo se realiza siguiendo buenas prácticas de ingeniería de software:
- Uso de control de versiones (Git) y ramas para features y correcciones.
- Componentización y reutilización de código en frontend.
- Servicios y controladores desacoplados en backend.
- Validaciones exhaustivas en ambos extremos.
- Documentación de código y endpoints.

### 3.4. Pruebas Unitarias
Se implementan pruebas unitarias y de integración para los servicios críticos del backend y los componentes principales del frontend. Las pruebas aseguran la correcta funcionalidad de los módulos, la integridad de los datos y la robustez ante casos de error.

### 3.5. Documentación
Toda la documentación del sistema, incluyendo diagramas, manuales de usuario, manuales técnicos y pruebas, se mantiene actualizada y accesible para facilitar el mantenimiento, la usabilidad y futuras ampliaciones del sistema.

### 3.6. Mantenimiento
El mantenimiento contempla la corrección de errores, la adaptación a nuevos requisitos y la mejora continua del sistema. Se recomienda un monitoreo constante y la actualización periódica de dependencias y librerías.

## 4. Entorno operativo
- **Base de datos:** Firestore (Firebase), NoSQL, escalable y en la nube.
- **Backend:** Java 17+, Spring Boot, ejecutable en cualquier servidor compatible (VPS, Heroku, Docker, etc.).
- **Frontend:** React 18, TypeScript, ejecutable en cualquier navegador moderno.
- **Despliegue:** Firebase Hosting para frontend, backend en servidor propio o en la nube.
- **Requisitos mínimos:**
  - Node.js 16+ y npm para frontend.
  - Java 17+ y Maven para backend.
  - Acceso a internet para integración con Firebase.

## 5. Requerimientos funcionales
El sistema expone una API RESTful y una interfaz web para la gestión de todas las entidades. A continuación, se describen los principales flujos y endpoints:

### 5.1. Iniciar Sesión (POST Login)
- **URL:** `/api/{idPlanta}/auth/login`
- **Entrada:** JSON con token de Firebase.
- **Salida:** Usuario autenticado, tipo de usuario, token de sesión.
- **Flujo:** El usuario ingresa sus credenciales, el sistema verifica el token con Firebase y retorna los datos del usuario y su rol.

### 5.2. Registro de usuario (POST Register)
- **URL:** `/api/{idPlanta}/auth/register`
- **Entrada:** JSON con email, password y tipo de usuario.
- **Salida:** Confirmación de registro y UID de Firebase.
- **Flujo:** El usuario se registra, el sistema crea el usuario en Firebase Auth y lo asocia a la planta y rol correspondiente.

### 5.3. Actualizar información de usuario (PUT Usuario)
- **URL:** `/api/{idPlanta}/administrador/usuarios/{id}`
- **Entrada:** JSON con los campos a actualizar.
- **Salida:** Usuario actualizado.
- **Flujo:** El usuario o administrador actualiza los datos personales o de otros usuarios según permisos.

### 5.4. Registrar Cliente (POST Cliente)
- **URL:** `/api/{idPlanta}/administrador/clientes`
- **Entrada:** JSON con datos del cliente.
- **Salida:** Cliente creado.

### 5.5. Recuperar Clientes (GET Clientes)
- **URL:** `/api/{idPlanta}/administrador/clientes`
- **Salida:** Lista de clientes registrados.

### 5.6. Registrar Conductor (POST Conductor)
- **URL:** `/api/{idPlanta}/administrador/conductores`
- **Entrada:** JSON con datos del conductor.
- **Salida:** Conductor creado.

### 5.7. Recuperar Conductores (GET Conductores)
- **URL:** `/api/{idPlanta}/administrador/conductores`
- **Salida:** Lista de conductores registrados.

### 5.8. Registrar Producto (POST Producto)
- **URL:** `/api/{idPlanta}/administrador/productos`
- **Entrada:** JSON con datos del producto.
- **Salida:** Producto creado.

### 5.9. Recuperar Productos (GET Productos)
- **URL:** `/api/{idPlanta}/administrador/productos`
- **Salida:** Lista de productos registrados.

### 5.10. Registrar Vehículo (POST Vehículo)
- **URL:** `/api/{idPlanta}/administrador/vehiculos`
- **Entrada:** JSON con datos del vehículo.
- **Salida:** Vehículo creado.

### 5.11. Recuperar Vehículos (GET Vehículos)
- **URL:** `/api/{idPlanta}/administrador/vehiculos`
- **Salida:** Lista de vehículos registrados.

### 5.12. Registrar Obra (POST Obra)
- **URL:** `/api/{idPlanta}/administrador/obras`
- **Entrada:** JSON con datos de la obra.
- **Salida:** Obra creada.

### 5.13. Recuperar Obras (GET Obras)
- **URL:** `/api/{idPlanta}/administrador/obras`
- **Salida:** Lista de obras registradas.

### 5.14. Registrar Pedido (POST Pedido)
- **URL:** `/api/{idPlanta}/administrador/pedidos`
- **Entrada:** JSON con datos del pedido (cliente, obra, productos, etc.).
- **Salida:** Pedido creado.

### 5.15. Recuperar Pedidos (GET Pedidos)
- **URL:** `/api/{idPlanta}/administrador/pedidos`
- **Salida:** Lista de pedidos registrados.

### 5.16. Actualizar Estado de Pedido (PATCH Estado)
- **URL:** `/api/{idPlanta}/administrador/pedidos/{id}/estado?nuevoEstado=ESTADO`
- **Salida:** Confirmación de cambio de estado.

### 5.17. Asignar Conductor a Pedido (PATCH Conductor)
- **URL:** `/api/{idPlanta}/administrador/pedidos/{id}/conductor?idConductor=ID`
- **Salida:** Confirmación de asignación.

### 5.18. Visualización de ubicaciones (GET Mapa)
- **URL:** `/api/{idPlanta}/mapa`
- **Salida:** Ubicaciones de obras, vehículos y pedidos en tiempo real.

### 5.19. Búsqueda y filtrado avanzado
- Todas las entidades permiten búsqueda por campos clave y filtrado por estado, fecha, etc.

## 6. Requerimientos no funcionales
### 6.1. Eficiencia
- Todas las operaciones deben responder en menos de 5 segundos bajo condiciones normales.
- La sincronización de datos debe ser instantánea o en menos de 1 minuto según la conectividad.

### 6.2. Seguridad y lógica de datos
- Autenticación obligatoria para todas las operaciones sensibles.
- Roles y permisos estrictos para cada tipo de usuario.
- Validación exhaustiva de datos en frontend y backend.
- Comunicación cifrada (HTTPS, JWT, Firebase Auth).
- Respaldo periódico de la base de datos.
- Cumplimiento de buenas prácticas de desarrollo seguro.

### 6.3. Hardware
- El sistema es multiplataforma y solo requiere un navegador moderno para el frontend.
- El backend requiere un servidor Java 21+ con acceso a internet.

## 7. Manual de usuario
### 7.1. Inicio
Al acceder a la plataforma, el usuario puede seleccionar la planta con la que desea trabajar. El sistema carga la información relevante (clientes, obras, productos, etc.) de la planta seleccionada.

### 7.2. Inicio de sesión
El usuario ingresa su correo y contraseña. Si los datos son correctos, accede al panel principal según su rol (administrador, operador, conductor, cliente).

### 7.3. Registro de nuevo usuario
El administrador puede registrar nuevos usuarios (clientes, conductores, operadores) desde el panel de administración, asignando roles y permisos.

### 7.4. Registro de obra
Desde el módulo de obras, se pueden registrar nuevas obras asociadas a un cliente, indicando dirección, municipio, ubicación y estado.

### 7.5. Home
El panel principal muestra un resumen de la operación: pedidos activos, vehículos disponibles, conductores asignados y alertas importantes.

### 7.6. Nueva materia (Producto/Pedido)
El usuario puede agregar nuevos productos al catálogo o crear nuevos pedidos, seleccionando cliente, obra, productos y cantidades.

### 7.7. Ingresar producto/pedido
En los formularios de productos y pedidos, se ingresan los datos requeridos y se valida la información antes de guardar.

### 7.8. Ingresar vehículo/conductor
Se pueden registrar y asignar vehículos y conductores a pedidos desde los módulos correspondientes.

### 7.9. Visualización de mapa
El usuario puede acceder al mapa para ver la ubicación de obras, vehículos y pedidos en tiempo real.

### 7.10. Gestión de pedidos
Desde el módulo de pedidos, se pueden ver, filtrar y actualizar los estados de los pedidos, así como asignar recursos.

### 7.11. Listas y reportes
El sistema permite exportar listas de clientes, pedidos, productos y generar reportes operativos.

### 7.12. Notificaciones y alertas
El usuario recibe notificaciones visuales ante eventos importantes: nuevos pedidos, cambios de estado, errores, etc.

### 7.13. Seguridad y cierre de sesión
El usuario puede cerrar sesión en cualquier momento. El sistema protege los datos y restringe el acceso a usuarios no autenticados.

## 8. Créditos y contacto
Concreteware es el resultado del trabajo de un equipo comprometido con la excelencia tecnológica. Para soporte, sugerencias o contribuciones, contacta a info@concreteware.com.

Esta documentación es tu guía para entender, desplegar y evolucionar Concreteware. Siéntete libre de mejorarla y compartirla. ¡Gracias por confiar en nuestro trabajo y por contribuir a la transformación digital de la industria del concreto! 
