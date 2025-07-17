import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Planta } from '../types';
import { Building, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [idPlanta, setIdPlanta] = useState('');
  const [plantas, setPlantas] = useState<Planta[]>([]);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, authenticatedUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPlantas = async () => {
      try {
        const plantasData = await api.getPlantas();
        const plantasArray = Array.isArray(plantasData) ? plantasData : [];
        setPlantas(plantasArray);
        if (plantasArray.length > 0) {
          setIdPlanta(plantasArray[0].idPlanta);
        }
      } catch (error) {
        console.error('Error al cargar plantas:', error);
        setPlantas([]);
        setError('Error al cargar las plantas disponibles');
      }
    };

    fetchPlantas();
  }, []);

  useEffect(() => {
    if (authenticatedUser) {
      const tipo = authenticatedUser.tipoUsuario?.toUpperCase();
      if (tipo === 'ADMIN' || tipo === 'ADMINISTRADOR') navigate('/admin');
      else if (tipo === 'CLIENTE') navigate('/cliente');
      else if (tipo === 'CONDUCTOR') navigate('/conductor');
    }
  }, [authenticatedUser, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    console.log('🔐 Login: Iniciando proceso...');
    console.log('📧 Email:', email);
    console.log('🏭 Planta ID:', idPlanta);
    console.log('🔑 Password:', password ? '***' : 'vacío');

    try {
      await login(email, password, idPlanta);
      // La redirección se maneja en el useEffect
    } catch (error: any) {
      console.error('❌ Login: Error en el proceso');
      const status = error?.response?.status;
      if (status === 404) {
        // Usuario no encontrado en la planta, redirigir a setup
        navigate('/setup');
        return;
      }
      setError(error.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  // Log de depuración para ver el valor de plantas en cada render
  console.log('DEBUG plantas:', plantas, typeof plantas, Array.isArray(plantas));

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="mx-auto h-12 w-12 flex items-center justify-center rounded-full bg-primary-100">
            <Building className="h-6 w-6 text-primary-600" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            ConcreteWare Admin
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Inicia sesión en tu cuenta
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="planta" className="sr-only">
                Planta
              </label>
              <select
                id="planta"
                name="planta"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                value={idPlanta}
                onChange={(e) => setIdPlanta(e.target.value)}
              >
                {Array.isArray(plantas) ? (
                  plantas.length > 0 ? (
                    plantas.map((planta) => (
                      <option key={planta.idPlanta} value={planta.idPlanta}>
                        {planta.nombre}
                      </option>
                    ))
                  ) : (
                    <option value="">No hay plantas disponibles</option>
                  )
                ) : (
                  <option value="">No hay plantas disponibles</option>
                )}
              </select>
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-gray-400" />
                ) : (
                  <Eye className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="rounded-md bg-red-50 p-4">
              <div className="text-sm text-red-700">{error}</div>
            </div>
          )}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login; 