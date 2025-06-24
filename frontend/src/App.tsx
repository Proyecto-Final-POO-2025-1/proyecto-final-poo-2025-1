import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Layout from './components/Layout';
import Login from './pages/Login';
import Setup from './pages/Setup';
import Clientes from './pages/Clientes';
import Conductores from './pages/Conductores';
import Productos from './pages/Productos';
import Vehiculos from './pages/Vehiculos';
import Obras from './pages/Obras';
import Pedidos from './pages/Pedidos';
import Mapa from './pages/Mapa';

// Componente para proteger rutas
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, authenticatedUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  // Si no hay usuario autenticado, redirigir a login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si hay usuario de Firebase pero no está configurado en el sistema, redirigir a setup
  if (user && !authenticatedUser) {
    return <Navigate to="/setup" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={<Setup />} />
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout>
              <Navigate to="/clientes" replace />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/clientes"
        element={
          <ProtectedRoute>
            <Layout>
              <Clientes />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/conductores"
        element={
          <ProtectedRoute>
            <Layout>
              <Conductores />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/productos"
        element={
          <ProtectedRoute>
            <Layout>
              <Productos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/vehiculos"
        element={
          <ProtectedRoute>
            <Layout>
              <Vehiculos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/obras"
        element={
          <ProtectedRoute>
            <Layout>
              <Obras />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/pedidos"
        element={
          <ProtectedRoute>
            <Layout>
              <Pedidos />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/mapa"
        element={
          <ProtectedRoute>
            <Layout>
              <Mapa />
            </Layout>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#10B981',
                secondary: '#fff',
              },
            },
            error: {
              duration: 5000,
              iconTheme: {
                primary: '#EF4444',
                secondary: '#fff',
              },
            },
          }}
        />
      </AuthProvider>
    </Router>
  );
};

export default App; 