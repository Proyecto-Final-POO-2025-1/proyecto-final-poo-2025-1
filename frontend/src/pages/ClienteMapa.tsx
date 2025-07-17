import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon } from 'leaflet';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido, Vehiculo, VehiculoConConductor, Conductor } from '../types';
import 'leaflet/dist/leaflet.css';
import { Truck, User } from 'lucide-react';

const ClienteMapa: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [vehiculos, setVehiculos] = useState<(Vehiculo & Partial<VehiculoConConductor>)[]>([]);
  const [loading, setLoading] = useState(true);
  const [conductores, setConductores] = useState<Conductor[]>([]);

  // Ubicación por defecto (Bogotá)
  const defaultLocation = { lat: 4.7110, lng: -74.0721 };

  useEffect(() => {
    if (user?.uid && currentPlanta) {
      fetchPedidosYVehiculos();
      fetchConductores();
    }
  }, [user, currentPlanta]);

  const fetchConductores = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getConductores(currentPlanta);
      setConductores(data);
    } catch (e) {}
  };

  const fetchPedidosYVehiculos = async () => {
    if (!user?.uid || !currentPlanta) return;
    setLoading(true);
    try {
      const pedidosAll = await api.getPedidos(currentPlanta);
      // Solo pedidos del cliente con conductor, vehículo y en estados relevantes
      const misPedidos = pedidosAll.filter((p: Pedido) =>
        p.idCliente === user.uid &&
        p.idConductor &&
        p.idVehiculo &&
        (p.estado === 'CARGANDO' || p.estado === 'EN_CAMINO' || p.estado === 'ENTREGADO')
      );
      setPedidos(misPedidos);
      // Solo vehículos de esos pedidos y con ubicación válida
      const vehiculosAll = await api.getVehiculos(currentPlanta);
      const vehiculosPedidos = vehiculosAll.filter(
        (v: Vehiculo) =>
          misPedidos.some(p => p.idVehiculo === v.idVehiculo) &&
          v.ubicacionActual &&
          v.ubicacionActual.latitud &&
          v.ubicacionActual.longitud
      );
      setVehiculos(vehiculosPedidos);
    } catch (e) {
      // Manejo simple de error
    } finally {
      setLoading(false);
    }
  };

  const getEstadoColor = (estado?: string) => {
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-4">Mapa de Conductores</h1>
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="h-96 w-full relative">
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
              const pedido = pedidos.find(p => p.idVehiculo === vehiculo.idVehiculo);
              const conductor = conductores.find(c => c.id === pedido?.idConductor);
              if (!vehiculo.ubicacionActual) return null;
              return (
                <Marker
                  key={vehiculo.idVehiculo}
                  position={[
                    Number(vehiculo.ubicacionActual.latitud),
                    Number(vehiculo.ubicacionActual.longitud)
                  ]}
                  icon={new Icon({
                    iconUrl: 'https://cdn-icons-png.flaticon.com/512/854/854894.png',
                    iconSize: [32, 32],
                    iconAnchor: [16, 32],
                  })}
                >
                  <Popup>
                    <div className="p-2">
                      <div className="font-bold text-lg mb-2">
                        <Truck className="inline w-5 h-5 mr-1" />
                        {vehiculo.placa}
                      </div>
                      <div className="space-y-1 text-sm">
                        <div><strong>Vehículo:</strong> {vehiculo.tipo}</div>
                        <div><strong>Capacidad:</strong> {vehiculo.capacidadM3} m³</div>
                        <div><strong>Estado del pedido:</strong> {pedido ? pedido.estado.replace('_', ' ') : 'N/A'}</div>
                        {conductor && (
                          <div className="mt-2 pt-2 border-t">
                            <div className="font-semibold text-blue-600">
                              <User className="inline w-4 h-4 mr-1" />
                              Conductor
                            </div>
                            <div><strong>Nombre:</strong> {conductor.nombre}</div>
                            <div><strong>Teléfono:</strong> {conductor.telefono}</div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
          {vehiculos.length === 0 && !loading && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-white bg-opacity-80 p-4 rounded shadow text-center">
                <p className="text-gray-700">No hay vehículos/conductores en ruta para tus pedidos.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClienteMapa; 