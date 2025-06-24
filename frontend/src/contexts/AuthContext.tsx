import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { api } from '../services/api';
import { AuthenticatedUser } from '../types';

interface AuthContextType {
  user: User | null;
  authenticatedUser: AuthenticatedUser | null;
  loading: boolean;
  login: (email: string, password: string, idPlanta: string) => Promise<void>;
  logout: () => Promise<void>;
  setCurrentPlanta: (idPlanta: string) => void;
  currentPlanta: string | null;
  verifyUserSetup: (idPlanta: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authenticatedUser, setAuthenticatedUser] = useState<AuthenticatedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPlanta, setCurrentPlanta] = useState<string | null>(null);

  // Persistencia en localStorage
  useEffect(() => {
    const storedAuthUser = localStorage.getItem('authenticatedUser');
    const storedPlanta = localStorage.getItem('currentPlanta');
    if (storedAuthUser) {
      setAuthenticatedUser(JSON.parse(storedAuthUser));
    }
    if (storedPlanta) {
      setCurrentPlanta(storedPlanta);
    }
  }, []);

  useEffect(() => {
    if (authenticatedUser) {
      localStorage.setItem('authenticatedUser', JSON.stringify(authenticatedUser));
    } else {
      localStorage.removeItem('authenticatedUser');
    }
  }, [authenticatedUser]);

  useEffect(() => {
    if (currentPlanta) {
      localStorage.setItem('currentPlanta', currentPlanta);
    } else {
      localStorage.removeItem('currentPlanta');
    }
  }, [currentPlanta]);

  const verifyUserSetup = async (idPlanta: string): Promise<boolean> => {
    if (!user) return false;
    try {
      const idToken = await user.getIdToken();
      const authUser = await api.login(idToken, idPlanta);
      setAuthenticatedUser(authUser);
      setCurrentPlanta(idPlanta);
      return true;
    } catch (error) {
      console.error('Error al verificar configuración de usuario:', error);
      setAuthenticatedUser(null);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user);
      setLoading(false);
      // Si hay usuario y datos en localStorage, revalidar con backend
      const storedPlanta = localStorage.getItem('currentPlanta');
      if (user && storedPlanta) {
        await verifyUserSetup(storedPlanta);
      }
    });
    return unsubscribe;
  }, []);

  const login = async (email: string, password: string, idPlanta: string) => {
    try {
      console.log('🔐 Iniciando proceso de login...');
      console.log('📧 Email:', email);
      console.log('🏭 Planta ID:', idPlanta);
      
      // Paso 1: Login con Firebase
      console.log('🔥 Paso 1: Autenticando con Firebase...');
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('✅ Firebase Auth exitoso');
      console.log('👤 Usuario Firebase UID:', userCredential.user.uid);
      
      // Paso 2: Obtener token de Firebase
      console.log('🎫 Paso 2: Obteniendo token de Firebase...');
      const idToken = await userCredential.user.getIdToken();
      console.log('✅ Token obtenido (primeros 20 chars):', idToken.substring(0, 20) + '...');
      
      // Paso 3: Verificar con el backend
      console.log('🌐 Paso 3: Verificando con el backend...');
      console.log('📡 URL del endpoint:', `http://localhost:8080/${idPlanta}/auth/login`);
      
      const authUser = await api.login(idToken, idPlanta);
      console.log('✅ Backend verification exitoso');
      console.log('👤 Usuario autenticado:', authUser);
      
      setAuthenticatedUser(authUser);
      setCurrentPlanta(idPlanta);
      console.log('🎉 Login completado exitosamente');
    } catch (error: any) {
      console.error('❌ Error en login:', error);
      console.error('🔍 Detalles del error:', {
        message: error?.message || 'Error desconocido',
        code: error?.code || 'Sin código',
        stack: error?.stack || 'Sin stack trace'
      });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setAuthenticatedUser(null);
      setCurrentPlanta(null);
    } catch (error) {
      console.error('Error en logout:', error);
      throw error;
    }
  };

  const value = {
    user,
    authenticatedUser,
    loading,
    login,
    logout,
    setCurrentPlanta,
    currentPlanta,
    verifyUserSetup,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 