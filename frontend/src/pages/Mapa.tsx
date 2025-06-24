import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { VehiculoConConductor } from '../types';
import { MapPin, Truck, User, Calendar } from 'lucide-react';
import toast from 'react-hot-toast';
import 'leaflet/dist/leaflet.css';

// Fix para los iconos de Leaflet en React
delete (Icon.Default.prototype as any)._getIconUrl;
Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const Mapa: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [vehiculos, setVehiculos] = useState<VehiculoConConductor[]>([]);
  const [loading, setLoading] = useState(true);
  const [useMockData, setUseMockData] = useState(true); // Para pruebas

  // Ubicación por defecto (Bogotá, Colombia)
  const defaultLocation = { lat: 4.7110, lng: -74.0721 };

  useEffect(() => {
    if (currentPlanta) {
      fetchVehiculos();
    }
  }, [currentPlanta]);

  const fetchVehiculos = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      
      if (useMockData) {
        // Datos de prueba con ubicaciones simuladas
        const mockVehiculos: VehiculoConConductor[] = [
          {
            idVehiculo: '1',
            placa: 'ABC123',
            marca: 'Mercedes-Benz',
            modelo: 'Sprinter',
            capacidad: 5000,
            estado: 'EN_RUTA',
            conductor: {
              id: '1',
              nombre: 'Juan Pérez',
              email: 'juan@ejemplo.com',
              telefono: '3001234567',
              licencia: 'B2'
            },
            ubicacion: {
              latitud: 4.7110,
              longitud: -74.0721,
              timestamp: new Date().toISOString()
            }
          },
          {
            idVehiculo: '2',
            placa: 'XYZ789',
            marca: 'Ford',
            modelo: 'Transit',
            capacidad: 3000,
            estado: 'EN_RUTA',
            conductor: {
              id: '2',
              nombre: 'María García',
              email: 'maria@ejemplo.com',
              telefono: '3009876543',
              licencia: 'B2'
            },
            ubicacion: {
              latitud: 4.7210,
              longitud: -74.0821,
              timestamp: new Date().toISOString()
            }
          },
          {
            idVehiculo: '3',
            placa: 'DEF456',
            marca: 'Chevrolet',
            modelo: 'Express',
            capacidad: 4000,
            estado: 'DISPONIBLE',
            conductor: {
              id: '3',
              nombre: 'Carlos López',
              email: 'carlos@ejemplo.com',
              telefono: '3005555555',
              licencia: 'B2'
            },
            ubicacion: {
              latitud: 4.7010,
              longitud: -74.0621,
              timestamp: new Date().toISOString()
            }
          }
        ];
        setVehiculos(mockVehiculos);
      } else {
        // Aquí iría la llamada real a la API cuando esté implementada
        // const data = await api.getVehiculosConConductores(currentPlanta);
        // setVehiculos(data);
        toast.success('Modo de prueba activado. Cambia a datos reales cuando esté implementado.');
      }
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
      toast.error('Error al cargar los vehículos');
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'EN_RUTA':
        return 'bg-blue-500';
      case 'DISPONIBLE':
        return 'bg-green-500';
      case 'EN_MANTENIMIENTO':
        return 'bg-yellow-500';
      case 'FUERA_DE_SERVICIO':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString('es-CO');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Mapa de Vehículos</h1>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="useMockData"
              checked={useMockData}
              onChange={(e) => setUseMockData(e.target.checked)}
              className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label htmlFor="useMockData" className="text-sm text-gray-700">
              Usar datos de prueba
            </label>
          </div>
          <button
            onClick={fetchVehiculos}
            className="btn-secondary"
          >
            Actualizar
          </button>
        </div>
      </div>

      {/* Leyenda */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Leyenda</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
            <span className="text-sm">En Ruta</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-500 rounded-full"></div>
            <span className="text-sm">Disponible</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
            <span className="text-sm">En Mantenimiento</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span className="text-sm">Fuera de Servicio</span>
          </div>
        </div>
      </div>

      {/* Mapa */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 w-full">
          <MapContainer
            center={defaultLocation}
            zoom={13}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            
            {vehiculos.map((vehiculo) => {
              if (!vehiculo.ubicacion) return null;
              
              return (
                <Marker
                  key={vehiculo.idVehiculo}
                  position={[
                    Number(vehiculo.ubicacion.latitud),
                    Number(vehiculo.ubicacion.longitud)
                  ]}
                  icon={new Icon({
                    iconUrl: 'data:image/svg+xml;base64,' + btoa(`
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" fill="${getEstadoColor(vehiculo.estado).replace('bg-', '').replace('-500', '')}" stroke="white" stroke-width="2"/>
                        <path d="M8 12h8M8 16h8" stroke="white" stroke-width="2" stroke-linecap="round"/>
                      </svg>
                    `),
                    iconSize: [24, 24],
                    iconAnchor: [12, 12],
                  })}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="font-bold text-lg mb-2">
                        <Truck className="inline w-5 h-5 mr-1" />
                        {vehiculo.placa}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><strong>Vehículo:</strong> {vehiculo.marca} {vehiculo.modelo}</div>
                        <div><strong>Capacidad:</strong> {vehiculo.capacidad} kg</div>
                        <div><strong>Estado:</strong> 
                          <span className={`ml-1 px-2 py-1 text-xs rounded-full ${getEstadoColor(vehiculo.estado)} text-white`}>
                            {vehiculo.estado}
                          </span>
                        </div>
                        {vehiculo.conductor && (
                          <div className="mt-2 pt-2 border-t">
                            <div className="font-semibold text-blue-600">
                              <User className="inline w-4 h-4 mr-1" />
                              Conductor
                            </div>
                            <div><strong>Nombre:</strong> {vehiculo.conductor.nombre}</div>
                            <div><strong>Teléfono:</strong> {vehiculo.conductor.telefono}</div>
                            <div><strong>Licencia:</strong> {vehiculo.conductor.licencia}</div>
                          </div>
                        )}
                        <div className="mt-2 pt-2 border-t text-xs text-gray-500">
                          <Calendar className="inline w-3 h-3 mr-1" />
                          Última actualización: {vehiculo.ubicacion.timestamp ? formatTimestamp(vehiculo.ubicacion.timestamp) : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Lista de vehículos */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Vehículos ({vehiculos.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conductor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Ubicación
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vehiculos.map((vehiculo) => (
                <tr key={vehiculo.idVehiculo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehiculo.placa}</div>
                    <div className="text-sm text-gray-500">{vehiculo.marca} {vehiculo.modelo}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {vehiculo.conductor ? (
                      <div>
                        <div className="text-sm font-medium text-gray-900">{vehiculo.conductor.nombre}</div>
                        <div className="text-sm text-gray-500">{vehiculo.conductor.telefono}</div>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-400">Sin conductor asignado</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(vehiculo.estado)} text-white`}>
                      {vehiculo.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {vehiculo.ubicacion ? (
                      <div>
                        <div>{Number(vehiculo.ubicacion.latitud).toFixed(4)}, {Number(vehiculo.ubicacion.longitud).toFixed(4)}</div>
                        <div className="text-xs">{vehiculo.ubicacion.timestamp ? formatTimestamp(vehiculo.ubicacion.timestamp) : 'N/A'}</div>
                      </div>
                    ) : (
                      <span className="text-gray-400">Sin ubicación</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Mapa; 