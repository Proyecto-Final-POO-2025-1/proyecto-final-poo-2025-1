#!/bin/bash

echo "🚀 Configurando ConcreteWare Admin Frontend..."

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor instala Node.js 16 o superior."
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js versión $NODE_VERSION detectada. Se requiere Node.js 16 o superior."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencias instaladas correctamente"
else
    echo "❌ Error al instalar dependencias"
    exit 1
fi

# Crear archivo de configuración de Firebase si no existe
if [ ! -f "src/firebase.ts" ]; then
    echo "⚠️  Archivo firebase.ts no encontrado. Creando plantilla..."
    cat > src/firebase.ts << 'EOF'
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "tu-api-key",
  authDomain: "tu-auth-domain",
  projectId: "tu-project-id",
  storageBucket: "tu-storage-bucket",
  messagingSenderId: "tu-messaging-sender-id",
  appId: "tu-app-id"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
EOF
    echo "✅ Plantilla de firebase.ts creada"
fi

# Verificar si el backend está ejecutándose
echo "🔍 Verificando conexión con el backend..."
if curl -s http://localhost:8080/actuator/health > /dev/null 2>&1; then
    echo "✅ Backend Spring Boot detectado en http://localhost:8080"
else
    echo "⚠️  Backend Spring Boot no detectado en http://localhost:8080"
    echo "   Asegúrate de que el backend esté ejecutándose antes de usar el frontend"
fi

echo ""
echo "🎉 Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "1. Configura las credenciales de Firebase en src/firebase.ts"
echo "2. Asegúrate de que el backend Spring Boot esté ejecutándose"
echo "3. Ejecuta 'npm start' para iniciar la aplicación"
echo ""
echo "🌐 La aplicación estará disponible en http://localhost:3000"
echo ""
echo "📚 Para más información, consulta el README.md" 