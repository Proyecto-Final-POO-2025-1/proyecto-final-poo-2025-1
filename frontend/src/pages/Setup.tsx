import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Planta } from '../types';
import { User, Settings, CheckCircle, AlertCircle, LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Setup: React.FC = () => {
  const { user, currentPlanta, setCurrentPlanta, verifyUserSetup, logout } = useAuth();
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPlanta, setSelectedPlanta] = useState<string>('');
  const [setupComplete, setSetupComplete] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetchPlantas();
  }, []);

  const fetchPlantas = async () => {
    try {
      const data = await api.getPlantas();
      setPlantas(data);
      if (data.length > 0) {
        setSelectedPlanta(data[0].idPlanta);
      }
    } catch (error) {
      console.error('Error al cargar plantas:', error);
      toast.error('Error al cargar las plantas');
    }
  };

  const handleSetupUser = async () => {
    if (!user || !selectedPlanta) return;

    setLoading(true);
    try {
      // Usar el endpoint para usuarios existentes
      const response = await fetch(`http://localhost:8080/${selectedPlanta}/auth/setup-existing`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user.email,
          tipoUsuario: 'ADMIN'
        })
      });

      if (response.ok) {
        // Verificar que el usuario se configuró correctamente
        const isSetup = await verifyUserSetup(selectedPlanta);
        if (isSetup) {
          setSetupComplete(true);
          toast.success('Usuario configurado correctamente');
        } else {
          toast.error('Error al verificar la configuración del usuario');
        }
      } else {
        const error = await response.text();
        console.error('Error:', error);
        toast.error('Error al configurar usuario: ' + error);
      }
    } catch (error) {
      console.error('Error al configurar usuario:', error);
      toast.error('Error al configurar usuario');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast.success('Sesión cerrada correctamente');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      toast.error('Error al cerrar sesión');
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Usuario no autenticado
          </h2>
          <p className="text-gray-600">
            Por favor, inicia sesión primero.
          </p>
        </div>
      </div>
    );
  }

  if (setupComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <CheckCircle className="mx-auto h-12 w-12 text-green-500 mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            ¡Configuración completada!
          </h2>
          <p className="text-gray-600 mb-4">
            Tu usuario ha sido configurado correctamente.
          </p>
          <button
            onClick={() => navigate('/clientes')}
            className="btn-primary"
          >
            Ir al Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <Settings className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Configuración Inicial
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Configura tu usuario administrador
          </p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario Autenticado
            </label>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">{user.email}</p>
                <p className="text-xs text-gray-500">UID: {user.uid}</p>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Seleccionar Planta
            </label>
            <select
              value={selectedPlanta}
              onChange={(e) => setSelectedPlanta(e.target.value)}
              className="input-field"
            >
              {plantas.map((planta) => (
                <option key={planta.idPlanta} value={planta.idPlanta}>
                  {planta.nombre}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              Información importante:
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Se configurará tu usuario existente como administrador</li>
              <li>• Podrás acceder a todas las funcionalidades del sistema</li>
              <li>• Esta configuración solo es necesaria la primera vez</li>
            </ul>
          </div>

          <button
            onClick={handleSetupUser}
            disabled={loading || !selectedPlanta}
            className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Configurando...' : 'Configurar Usuario'}
          </button>

          <div className="border-t pt-4">
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <LogOut className="h-4 w-4" />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup; 