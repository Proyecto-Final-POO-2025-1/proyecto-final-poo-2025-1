// Script para configurar el primer usuario administrador
// Ejecutar en la consola del navegador después de hacer login con Firebase

const setupFirstUser = async () => {
  try {
    const user = auth.currentUser;
    if (!user) {
      console.error('No hay usuario autenticado');
      return;
    }

    const idToken = await user.getIdToken();
    const idPlanta = 'UMu5w9GVctvC4diaewkJ'; // ID de la planta Concrecol

    // Crear usuario en Firestore
    const response = await fetch(`http://localhost:8080/${idPlanta}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: user.email,
        password: 'password123', // Contraseña temporal
        tipoUsuario: 'ADMIN'
      })
    });

    if (response.ok) {
      console.log('Usuario configurado correctamente');
    } else {
      const error = await response.text();
      console.error('Error:', error);
    }
  } catch (error) {
    console.error('Error al configurar usuario:', error);
  }
};

// Ejecutar en la consola del navegador
// setupFirstUser(); 