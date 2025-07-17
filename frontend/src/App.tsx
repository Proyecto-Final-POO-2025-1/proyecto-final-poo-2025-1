import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
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
import AdminDashboard from './pages/AdminDashboard';
import ClienteDashboard from './pages/ClienteDashboard';
import ClientePedidos from './pages/ClientePedidos';
import ClienteMapa from './pages/ClienteMapa';
import ConductorDashboard from './pages/ConductorDashboard';
import ConductorPedidos from './pages/ConductorPedidos';
import ConductorChecklist from './pages/ConductorChecklist';
import ConductorNovedades from './pages/ConductorNovedades';

// Componente para proteger rutas y redirigir según tipo de usuario
const ProtectedRoute: React.FC<{ allowedRoles: string[]; children: React.ReactNode }> = ({ allowedRoles, children }) => {
  const { user, authenticatedUser, loading } = useAuth();

  // Permitir equivalencia ADMINISTRADOR <-> ADMIN
  const getNormalizedRole = (role?: string) => {
    if (!role) return undefined;
    if (role.toUpperCase() === 'ADMIN' || role.toUpperCase() === 'ADMINISTRADOR') return 'ADMIN';
    if (role.toUpperCase() === 'CLIENTE') return 'CLIENTE';
    if (role.toUpperCase() === 'CONDUCTOR') return 'CONDUCTOR';
    return role;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user && !authenticatedUser) {
    return <Navigate to="/setup" replace />;
  }

  const normalizedRole = getNormalizedRole(authenticatedUser?.tipoUsuario);
  const normalizedAllowedRoles = allowedRoles.map(getNormalizedRole);

  if (authenticatedUser && !normalizedAllowedRoles.includes(normalizedRole)) {
    // Redirigir al dashboard correcto si intenta acceder a otro
    if (normalizedRole === 'ADMIN') return <Navigate to="/admin" replace />;
    if (normalizedRole === 'CLIENTE') return <Navigate to="/cliente" replace />;
    if (normalizedRole === 'CONDUCTOR') return <Navigate to="/conductor" replace />;
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { authenticatedUser } = useAuth();

  // Redirección tras login según tipo de usuario
  const getDefaultRoute = () => {
    if (!authenticatedUser) return '/login';
    const normalizedRole = authenticatedUser.tipoUsuario?.toUpperCase();
    if (normalizedRole === 'ADMIN' || normalizedRole === 'ADMINISTRADOR') return '/admin';
    if (normalizedRole === 'CLIENTE') return '/cliente';
    if (normalizedRole === 'CONDUCTOR') return '/conductor';
    return '/login';
  };

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/setup" element={<Setup />} />
      <Route path="/" element={<Navigate to={getDefaultRoute()} replace />} />

      {/* Dashboard Administrador */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["ADMINISTRADOR"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="productos" element={<Productos />} />
        <Route path="pedidos" element={<Pedidos />} />
        <Route path="vehiculos" element={<Vehiculos />} />
        <Route path="obras" element={<Obras />} />
        <Route path="clientes" element={<Clientes />} />
        <Route path="conductores" element={<Conductores />} />
        <Route index element={<div>Bienvenido al panel de administración de ConcreteWare.</div>} />
      </Route>

      {/* Dashboard Cliente */}
      <Route
        path="/cliente/*"
        element={
          <ProtectedRoute allowedRoles={["CLIENTE"]}>
            <ClienteDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="pedidos" element={<ClientePedidos />} />
        <Route path="mapa" element={<ClienteMapa />} />
        <Route index element={<div>Bienvenido al panel de cliente.</div>} />
      </Route>

      {/* Dashboard Conductor */}
      <Route
        path="/conductor"
        element={
          <ProtectedRoute allowedRoles={["CONDUCTOR"]}>
            <ConductorDashboard />
          </ProtectedRoute>
        }
      >
        <Route path="pedidos" element={<ConductorPedidos />} />
        <Route path="checklist" element={<ConductorChecklist />} />
        <Route path="novedad" element={<ConductorNovedades />} />
        <Route index element={<div>Bienvenido al panel de conductor.</div>} />
      </Route>
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