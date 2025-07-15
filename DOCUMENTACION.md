# DOCUMENTACION

Bienvenido a la documentación oficial de **Concreteware**, una plataforma integral diseñada para revolucionar la gestión de plantas de concreto premezclado. Este documento está pensado para que cualquier desarrollador, administrador o interesado pueda comprender, desplegar, mantener y evolucionar el sistema con facilidad y confianza. Aquí encontrarás una explicación detallada y humana de cada aspecto del proyecto, desde su arquitectura hasta las mejores prácticas para su operación.

## ¿Qué es Concreteware?
Concreteware es una solución tecnológica fullstack que centraliza la administración de clientes, obras, productos, vehículos, conductores y pedidos en empresas de concreto premezclado. Su objetivo es digitalizar y optimizar la logística, el control de inventario, la asignación de recursos y la trazabilidad de los pedidos, todo bajo un entorno seguro y moderno.

## Arquitectura y Tecnologías
El sistema está compuesto por dos grandes bloques: un **frontend** desarrollado en React con TypeScript y un **backend** robusto en Java con Spring Boot. Ambos se comunican mediante una API REST y utilizan Firebase tanto para la autenticación de usuarios como para el almacenamiento de datos en Firestore.

- **Frontend:**
  - React 18, TypeScript, Tailwind CSS para una interfaz moderna y responsiva.
  - React Router para navegación SPA.
  - Axios para la comunicación HTTP con el backend.
  - React Hook Form y validaciones para formularios robustos.
  - Firebase Authentication para login seguro.
- **Backend:**
  - Java 21+, Spring Boot para una API escalable y mantenible.
  - Firebase Admin SDK para integración con Firestore y autenticación.
  - Maven para la gestión de dependencias y construcción.
- **Despliegue:**
  - Firebase Hosting para el frontend.
  - Backend desplegable en cualquier servidor Java (VPS, Heroku, Docker, etc.).

## Estructura del Proyecto
El código está organizado para maximizar la claridad y la mantenibilidad. El frontend contiene componentes, páginas, contextos y servicios bien separados. El backend sigue la arquitectura típica de Spring Boot, con controladores, servicios y modelos claramente definidos.

### Estructura principal:
- **frontend/**
  - `src/components/`: Componentes reutilizables de UI.
  - `src/pages/`: Vistas principales (Login, Clientes, Conductores, Productos, Vehículos, Obras, Pedidos, Mapa, Setup).
  - `src/contexts/`: Contextos globales como autenticación.
  - `src/services/`: Lógica de conexión a la API.
  - `src/types/`: Modelos de datos TypeScript alineados con el backend.
- **backend/src/main/java/com/concreteware/**
  - `administrador/controller/`: Controladores REST para cada entidad.
  - `auth/controller/`: Controladores de autenticación y gestión de plantas.
  - `core/model/`: Modelos de dominio (Cliente, Obra, Pedido, Producto, Vehículo, Conductor, etc.).
  - `common/enums/`: Enumeraciones de estados y tipos.
  - `config/`: Configuración de Spring y Firebase.

## Modelos de Datos y Entidades
La base de datos y los modelos están cuidadosamente diseñados para reflejar la realidad operativa de una planta de concreto. Cada entidad tiene atributos claros y relaciones bien definidas.

- **Usuario:** Base para clientes y conductores, incluye id, nombre, email, teléfono y DNI.
- **Cliente:** Extiende usuario, añade NIT, nombre de empresa y obras asociadas.
- **Conductor:** Extiende usuario, añade licencia de conducción y estado (activo/inactivo).
- **Producto:** Catálogo de productos, con nombre comercial, descripción y precio base.
- **Vehículo:** Incluye placa, tipo, capacidad, estado, ubicación y conductor asignado.
- **Obra:** Representa una obra de construcción, con dirección, municipio, ubicación geográfica, estado y cliente asociado.
- **Pedido:** Pedido de concreto, vincula cliente, obra, vehículo, conductor y productos solicitados, con fecha/hora de entrega y estado.
- **ProductoPedido:** Detalle de cada producto en un pedido, con cantidad, precio unitario y observaciones.
- **Planta:** Identificador, nombre y base URL de la planta.

Todos los modelos están sincronizados entre backend (Java) y frontend (TypeScript), lo que facilita la integración y reduce errores de comunicación.

## Funcionalidades Principales
Concreteware ofrece un conjunto completo de funcionalidades para la gestión diaria de una planta:

- **Autenticación segura:** Login con Firebase, persistencia de sesión y control de acceso por tipo de usuario.
- **Gestión de plantas:** Selección y persistencia de la planta activa, permitiendo multi-tenencia.
- **CRUD de clientes:** Alta, baja, modificación, listado y búsqueda avanzada de clientes.
- **CRUD de conductores:** Gestión de conductores, incluyendo licencias y estados.
- **CRUD de productos:** Catálogo de productos, con control de precios y descripciones.
- **CRUD de vehículos:** Registro y gestión de vehículos, asignación de conductores y control de estado.
- **CRUD de obras:** Registro de obras por cliente, con ubicación y estado.
- **CRUD de pedidos:** Creación de pedidos multi-producto, asignación de recursos, control de estados y trazabilidad.
- **Mapa de ubicaciones:** Visualización geográfica de obras, vehículos y pedidos en tiempo real.
- **Búsqueda y filtrado:** Tablas con búsqueda instantánea y filtros avanzados.
- **Formularios inteligentes:** Validación en tiempo real, feedback visual y manejo de errores.
- **Notificaciones:** Alertas y mensajes para acciones exitosas o errores.
- **Diseño responsivo:** Experiencia óptima en móviles, tablets y desktop.

## API REST: Endpoints y Operaciones
El backend expone una API RESTful clara y bien documentada. Cada entidad cuenta con endpoints para operaciones CRUD y acciones específicas.

### Ejemplo de endpoints:
- **Autenticación y plantas:**
  - `POST /{idPlanta}/auth/login`: Verifica el token de Firebase y retorna el usuario autenticado.
  - `POST /{idPlanta}/auth/register`: Registra un nuevo usuario en Firebase y Firestore.
  - `GET /api/plantas`: Lista todas las plantas disponibles.
- **Clientes:**
  - `POST /{idPlanta}/administrador/clientes`: Crear cliente.
  - `GET /{idPlanta}/administrador/clientes`: Listar clientes.
  - `PUT /{idPlanta}/administrador/clientes/{id}`: Actualizar cliente.
  - `DELETE /{idPlanta}/administrador/clientes/{id}`: Eliminar cliente.
- **Conductores, productos, vehículos, obras y pedidos** siguen el mismo patrón REST, con endpoints para crear, listar, obtener por ID, actualizar y eliminar.
- **Pedidos:**
  - `PATCH /{idPlanta}/administrador/pedidos/{id}/estado?nuevoEstado=ESTADO`: Cambia el estado de un pedido.
  - `PATCH /{idPlanta}/administrador/pedidos/{id}/conductor?idConductor=ID`: Asigna un conductor a un pedido.

Todos los endpoints requieren autenticación y validan los permisos del usuario.

## Autenticación y Seguridad
La seguridad es un pilar fundamental en Concreteware. El sistema utiliza Firebase Authentication para el login y la gestión de sesiones, empleando tokens JWT que son verificados en el backend. Los roles y tipos de usuario permiten controlar el acceso a las distintas funcionalidades. Además, el backend implementa CORS para permitir únicamente peticiones desde el frontend autorizado y valida exhaustivamente los datos recibidos.

Las rutas del frontend están protegidas y solo los usuarios autenticados pueden acceder a la aplicación. Los formularios cuentan con validación tanto en cliente como en servidor, y los errores se comunican de forma clara al usuario.

## Configuración y Despliegue
Desplegar Concreteware es sencillo si se siguen los pasos recomendados:

### Frontend
1. Instala Node.js 16+ y npm.
2. Clona el repositorio y entra en la carpeta `frontend`.
3. Ejecuta `npm install` para instalar las dependencias.
4. Configura Firebase en `src/firebase.ts` con tus credenciales.
5. Configura la URL del backend en `src/services/api.ts`.
6. Ejecuta `npm start` para desarrollo o `npm run build` para producción.
7. Para desplegar, usa Firebase Hosting (`firebase deploy`). El archivo `firebase.json` ya está preparado para aplicaciones SPA.

### Backend
1. Instala Java 21+ y Maven.
2. Configura `src/main/resources/application.properties` con la URL de Firebase y el puerto deseado.
3. Ejecuta `mvn spring-boot:run` o compila el JAR y ejecútalo con `java -jar`.
4. Despliega en tu servidor preferido (VPS, Heroku, Docker, etc.).
5. Asegúrate de abrir el puerto 8080 (o el configurado).

## Buenas Prácticas y Recomendaciones
- Mantén sincronizados los modelos de datos entre frontend y backend.
- Revisa la configuración de CORS si encuentras errores 403/405.
- Verifica las credenciales y reglas de Firebase si hay problemas de autenticación.
- Limpia la caché y desregistra Service Workers si la SPA no responde como esperas.
- Usa logs y feedback visual para depurar y mejorar la experiencia de usuario.
- Protege siempre los endpoints sensibles y valida los datos en ambos extremos.
- Documenta cualquier cambio relevante para facilitar el mantenimiento futuro.

## Créditos y Contacto
Concreteware es el resultado del esfuerzo y la pasión de un equipo comprometido con la excelencia tecnológica. Si tienes dudas, sugerencias o necesitas soporte, no dudes en escribirnos a **cruedas@unal.edu.co**.

Esta documentación es tu guía para entender, desplegar y evolucionar Concreteware. Siéntete libre de mejorarla y compartirla. ¡Gracias por confiar en nuestro trabajo y por contribuir a la transformación digital de la industria del concreto! 
