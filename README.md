# 🏗️ Concreteware Backend

**Concreteware** es una plataforma tecnológica diseñada para la industria del concreto premezclado. Este repositorio contiene el backend desarrollado en Java, utilizando Firebase como base de datos en tiempo real, y expone una API para gestión de pedidos, usuarios, vehículos y logística de entrega.

---

## 🚀 Tecnologías

- Java 17+
- Firebase Realtime Database
- Firebase Admin SDK
- Maven
- IntelliJ IDEA

---

## 🧱 Estructura de carpetas

```
src/
├── main/
│   └── java/
│       └── com/concreteware/
│           ├── controllers/
│           ├── services/
│           ├── models/
│           ├── config/
│           └── Main.java
└── resources/
    └── application.properties
```

---

## 🔧 Configuración del proyecto

1. Clona el repositorio:

```bash
git clone https://github.com/Proyecto-Final-POO-2025-1/proyecto-final-poo-2025-1.git
```

2. Agrega el archivo `serviceAccountKey.json` descargado desde Firebase Console a la raíz del proyecto.

3. Configura la URL de la base de datos en `Main.java`:

```java
.setDatabaseUrl("https://<tu-proyecto>.firebaseio.com/")
```

4. Ejecuta el proyecto desde IntelliJ o con Maven:

```bash
mvn compile
mvn exec:java -Dexec.mainClass="com.concreteware.Main"
```

---

## 🌳 Convención de ramas

Consulta la estrategia de ramas en el archivo [`CONVENTION.md`](./CONVENTION.md)

---

## 📬 Contacto

Desarrollado por el equipo de **Concreteware**.  
Para soporte técnico o solicitudes comerciales, contáctanos en: **info@concreteware.com**