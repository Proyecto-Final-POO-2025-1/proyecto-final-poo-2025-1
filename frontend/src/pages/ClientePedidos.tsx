import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido, EstadoPedido, Producto } from '../types';
import toast from 'react-hot-toast';

const ClientePedidos: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [editProductos, setEditProductos] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user && currentPlanta) {
      fetchPedidos();
      fetchProductos();
    }
  }, [user, currentPlanta]);

  const fetchPedidos = async () => {
    if (!user || !currentPlanta) return;
    try {
      setLoading(true);
      const data = await api.getPedidosCliente(currentPlanta, user.uid);
      setPedidos(data);
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
    } catch (error) {
      // No es crítico
    }
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

  const handleEdit = () => {
    if (!selectedPedido) return;
    setEditProductos(selectedPedido.productos.map(p => ({ ...p })));
    setEditMode(true);
  };

  const handleCantidadChange = (idx: number, value: number) => {
    setEditProductos(editProductos.map((p, i) => i === idx ? { ...p, cantidadM3: value } : p));
  };

  const handleSave = async () => {
    if (!selectedPedido || !currentPlanta) return;
    setSaving(true);
    try {
      await api.updatePedidoCantidad(currentPlanta, selectedPedido.idPedido, editProductos);
      toast.success('Pedido actualizado');
      setShowDetailsModal(false);
      setSelectedPedido(null);
      setEditMode(false);
      fetchPedidos();
    } catch (e) {
      toast.error('Error al actualizar el pedido');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Mis Pedidos</h1>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      ) : pedidos.length === 0 ? (
        <p>No tienes pedidos registrados.</p>
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
                setEditMode(false);
              }}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">Detalles del Pedido</h2>
            <div className="space-y-2">
              <div><strong>ID:</strong> {selectedPedido.idPedido}</div>
              <div><strong>Fecha de entrega:</strong> {new Date(selectedPedido.fechaEntrega).toLocaleDateString()}</div>
              <div><strong>Estado:</strong> {selectedPedido.estado.replace('_', ' ')}</div>
              <div>
                <strong>Productos:</strong>
                <ul className="list-disc ml-6">
                  {editMode ? (
                    editProductos.map((prod, idx) => {
                      const p = productos.find(pr => pr.idProducto === prod.idProducto);
                      return (
                        <li key={idx} className="mb-2">
                          {p ? p.nombreComercial : prod.idProducto} - 
                          <input
                            type="number"
                            min={1}
                            value={prod.cantidadM3}
                            onChange={e => handleCantidadChange(idx, parseFloat(e.target.value))}
                            className="border rounded px-2 py-1 w-20 mx-2"
                            disabled={saving}
                          />
                          m³ x ${prod.precioUnitario} = {(prod.cantidadM3 * prod.precioUnitario).toLocaleString()}
                          {prod.observaciones && <span className="ml-2 text-xs text-gray-500">({prod.observaciones})</span>}
                        </li>
                      );
                    })
                  ) : (
                    selectedPedido.productos.map((prod, idx) => {
                      const p = productos.find(pr => pr.idProducto === prod.idProducto);
                      return (
                        <li key={idx}>
                          {p ? p.nombreComercial : prod.idProducto} - {prod.cantidadM3} m³ x ${prod.precioUnitario} = {(prod.cantidadM3 * prod.precioUnitario).toLocaleString()}
                          {prod.observaciones && <span className="ml-2 text-xs text-gray-500">({prod.observaciones})</span>}
                        </li>
                      );
                    })
                  )}
                </ul>
              </div>
              <div>
                <strong>Total:</strong> $
                {editMode
                  ? editProductos.reduce((sum, p) => sum + (p.cantidadM3 * p.precioUnitario), 0).toLocaleString()
                  : selectedPedido.productos.reduce((sum, p) => sum + (p.cantidadM3 * p.precioUnitario), 0).toLocaleString()
                }
              </div>
              {/* Botón de editar solo si pendiente y no en modo edición */}
              {selectedPedido.estado === EstadoPedido.PENDIENTE && !editMode && (
                <button className="btn-primary mt-4" onClick={handleEdit}>Modificar cantidad</button>
              )}
              {/* Botones de guardar/cancelar en modo edición */}
              {editMode && (
                <div className="flex gap-2 mt-4">
                  <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Guardando...' : 'Guardar cambios'}</button>
                  <button className="btn-secondary" onClick={() => setEditMode(false)} disabled={saving}>Cancelar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientePedidos; 