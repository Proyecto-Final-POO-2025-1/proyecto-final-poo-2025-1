import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido, EstadoPedido, Producto } from '../types';
import toast from 'react-hot-toast';

const ConductorPedidos: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editEstado, setEditEstado] = useState<EstadoPedido | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid && currentPlanta) {
      fetchPedidos();
      fetchProductos();
    }
  }, [user, currentPlanta]);

  // Actualización automática de ubicación cada 2 minutos
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    if (user?.uid && currentPlanta) {
      const updateUbicacion = async () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
              try {
                // Buscar el pedido activo (EN_PROCESO o EN_CAMINO)
                const pedidoActivo = pedidos.find(
                  (p) => p.idConductor === user.uid && (p.estado === EstadoPedido.CARGANDO || p.estado === EstadoPedido.EN_CAMINO)
                );
                if (pedidoActivo) {
                  await api.updateUbicacionPedidoConductor(currentPlanta, pedidoActivo.idPedido, {
                    latitud: position.coords.latitude,
                    longitud: position.coords.longitude,
                    descripcion: 'Ubicación automática',
                  });
                }
                // Opcional: toast.success('Ubicación actualizada');
              } catch (e) {
                toast.error('Error al enviar ubicación');
              }
            },
            (error) => {
              toast.error('No se pudo obtener la ubicación: ' + error.message);
            }
          );
        } else {
          toast.error('Geolocalización no soportada');
        }
      };
      updateUbicacion(); // Primer envío inmediato
      intervalId = setInterval(updateUbicacion, 120000); // Cada 2 minutos
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [user, currentPlanta, pedidos]);

  const fetchPedidos = async () => {
    if (!user?.uid || !currentPlanta) return;
    try {
      setLoading(true);
      const data = await api.getPedidos(currentPlanta);
      setPedidos(data.filter((p: Pedido) => p.idConductor === user.uid));
    } catch (error) {
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchProductos = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getProductos(currentPlanta);
      setProductos(data);
    } catch (error) {}
  };

  const getEstadoColor = (estado: EstadoPedido) => {
    switch (estado) {
      case EstadoPedido.PENDIENTE:
        return 'bg-yellow-100 text-yellow-800';
      case EstadoPedido.CARGANDO:
        return 'bg-blue-100 text-blue-800';
      case EstadoPedido.EN_CAMINO:
        return 'bg-purple-100 text-purple-800';
      case EstadoPedido.ENTREGADO:
        return 'bg-green-100 text-green-800';
      case EstadoPedido.CANCELADO:
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleEditEstado = () => {
    if (!selectedPedido) return;
    setEditEstado(selectedPedido.estado);
  };

  const handleSaveEstado = async () => {
    if (!selectedPedido || !editEstado || !currentPlanta) return;
    setSaving(true);
    try {
      await api.updateEstadoPedido(currentPlanta, selectedPedido.idPedido, editEstado);
      toast.success('Estado actualizado');
      setShowDetailsModal(false);
      setSelectedPedido(null);
      setEditEstado(null);
      fetchPedidos();
    } catch (e) {
      toast.error('Error al actualizar el estado');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Pedidos Asignados</h1>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      ) : pedidos.length === 0 ? (
        <p>No tienes pedidos asignados.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pedido</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha Entrega</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {pedidos.map((pedido) => (
                <tr key={pedido.idPedido} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{pedido.idPedido}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{new Date(pedido.fechaEntrega).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(pedido.estado)}`}>
                      {pedido.estado.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <button
                      className="btn-primary text-xs px-3 py-1"
                      onClick={() => {
                        setSelectedPedido(pedido);
                        setShowDetailsModal(true);
                      }}
                    >
                      Ver detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal de detalles */}
      {showDetailsModal && selectedPedido && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowDetailsModal(false);
                setSelectedPedido(null);
                setEditEstado(null);
              }}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">Detalles del Pedido</h2>
            <div className="space-y-2">
              <div><strong>ID:</strong> {selectedPedido.idPedido}</div>
              <div><strong>Fecha de entrega:</strong> {new Date(selectedPedido.fechaEntrega).toLocaleDateString()}</div>
              <div><strong>Estado:</strong> {editEstado === null ? selectedPedido.estado.replace('_', ' ') : (
                <select
                  value={editEstado}
                  onChange={e => setEditEstado(e.target.value as EstadoPedido)}
                  className="input-field ml-2"
                  disabled={saving}
                >
                  {Object.values(EstadoPedido).map(estado => (
                    <option key={estado} value={estado}>{estado.replace('_', ' ')}</option>
                  ))}
                </select>
              )}
              {editEstado === null && (
                <button className="btn-primary ml-2" onClick={handleEditEstado}>Cambiar estado</button>
              )}
              {editEstado !== null && (
                <button className="btn-primary ml-2" onClick={handleSaveEstado} disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
              )}
              </div>
              <div>
                <strong>Productos:</strong>
                <ul className="list-disc ml-6">
                  {selectedPedido.productos.map((prod, idx) => {
                    const p = productos.find(pr => pr.idProducto === prod.idProducto);
                    return (
                      <li key={idx}>
                        {p ? p.nombreComercial : prod.idProducto} - {prod.cantidadM3} m³ x ${prod.precioUnitario} = {(prod.cantidadM3 * prod.precioUnitario).toLocaleString()}
                        {prod.observaciones && <span className="ml-2 text-xs text-gray-500">({prod.observaciones})</span>}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div>
                <strong>Total:</strong> ${selectedPedido.productos.reduce((sum, p) => sum + (p.cantidadM3 * p.precioUnitario), 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConductorPedidos; 