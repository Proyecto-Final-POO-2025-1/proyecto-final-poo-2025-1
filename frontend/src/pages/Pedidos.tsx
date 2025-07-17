import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido, Cliente, Conductor, Producto, EstadoPedido, Obra } from '../types';
import { Plus, Edit, Search, X, Eye } from 'lucide-react';
import toast from 'react-hot-toast';

const Pedidos: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [productos, setProductos] = useState<Producto[]>([]);
  const [obras, setObras] = useState<Obra[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [formData, setFormData] = useState({
    idCliente: '',
    idObra: '',
    fechaEntrega: '',
    productos: [{ idProducto: '', cantidadM3: 1, precioUnitario: 0, observaciones: '' }],
  });

  useEffect(() => {
    if (currentPlanta) {
      fetchPedidos();
      fetchClientes();
      fetchConductores();
      fetchProductos();
      fetchObras();
    }
  }, [currentPlanta]);

  const fetchPedidos = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      const data = await api.getPedidos(currentPlanta);
      setPedidos(data);
    } catch (error) {
      console.error('Error al cargar pedidos:', error);
      toast.error('Error al cargar los pedidos');
    } finally {
      setLoading(false);
    }
  };

  const fetchClientes = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getClientes(currentPlanta);
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    }
  };

  const fetchConductores = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getConductores(currentPlanta);
      setConductores(data);
    } catch (error) {
      console.error('Error al cargar conductores:', error);
    }
  };

  const fetchProductos = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getProductos(currentPlanta);
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const fetchObras = async () => {
    if (!currentPlanta) return;
    try {
      const data = await api.getObras(currentPlanta);
      setObras(data);
    } catch (error) {
      console.error('Error al cargar obras:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlanta) return;

    try {
      const pedidoData = {
        idCliente: formData.idCliente,
        idObra: formData.idObra,
        fechaEntrega: formData.fechaEntrega,
        productos: formData.productos.map(p => ({
          idProducto: p.idProducto,
          cantidadM3: p.cantidadM3,
          precioUnitario: p.precioUnitario,
          observaciones: p.observaciones || '',
        })),
        idVehiculo: '',
        idConductor: '',
        horaEntrega: '',
        estado: EstadoPedido.PENDIENTE,
        ubicacionActual: { latitud: '', longitud: '' },
      };

      await api.createPedido(currentPlanta, pedidoData);
      toast.success('Pedido creado correctamente');
      
      setShowModal(false);
      resetForm();
      fetchPedidos();
    } catch (error) {
      console.error('Error al guardar pedido:', error);
      toast.error('Error al guardar el pedido');
    }
  };

  const handleUpdateEstado = async (idPedido: string, nuevoEstado: EstadoPedido) => {
    if (!currentPlanta) return;

    try {
      await api.updateEstadoPedido(currentPlanta, idPedido, nuevoEstado);
      toast.success('Estado del pedido actualizado');
      fetchPedidos();
    } catch (error) {
      console.error('Error al actualizar estado:', error);
      toast.error('Error al actualizar el estado');
    }
  };

  const handleAsignarConductor = async (idPedido: string, idConductor: string) => {
    if (!currentPlanta) return;

    try {
      await api.asignarConductor(currentPlanta, idPedido, idConductor);
      toast.success('Conductor asignado correctamente');
      fetchPedidos();
    } catch (error) {
      console.error('Error al asignar conductor:', error);
      toast.error('Error al asignar el conductor');
    }
  };

  const resetForm = () => {
    setFormData({
      idCliente: '',
      idObra: '',
      fechaEntrega: '',
      productos: [{ idProducto: '', cantidadM3: 1, precioUnitario: 0, observaciones: '' }],
    });
  };

  const addProducto = () => {
    setFormData({
      ...formData,
      productos: [...formData.productos, { idProducto: '', cantidadM3: 1, precioUnitario: 0, observaciones: '' }],
    });
  };

  const removeProducto = (index: number) => {
    const newProductos = formData.productos.filter((_, i) => i !== index);
    setFormData({ ...formData, productos: newProductos });
  };

  const updateProducto = (index: number, field: string, value: any) => {
    const newProductos = [...formData.productos];
    newProductos[index] = { ...newProductos[index], [field]: value };
    
    if (field === 'idProducto') {
      const producto = productos.find(p => p.idProducto === value);
      if (producto) {
        newProductos[index].precioUnitario = producto.precioBase;
      }
    }
    
    setFormData({ ...formData, productos: newProductos });
  };

  const filteredPedidos = pedidos.filter(pedido => {
    const cliente = clientes.find(c => c.id === pedido.idCliente);
    return cliente?.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
           pedido.idPedido.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getClienteName = (idCliente: string) => {
    const cliente = clientes.find(c => c.id === idCliente);
    return cliente ? cliente.nombreEmpresa : 'Cliente no encontrado';
  };

  const getConductorName = (idConductor: string) => {
    const conductor = conductores.find(c => c.id === idConductor);
    return conductor ? conductor.nombre : 'No asignado';
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
        <h1 className="text-2xl font-bold text-gray-900">Pedidos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Pedido
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar pedidos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabla de pedidos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pedido
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fechas
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conductor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPedidos.map((pedido) => (
                <tr key={pedido.idPedido} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{pedido.idPedido}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClienteName(pedido.idCliente)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      {/* <div className="text-sm text-gray-900">
                        Pedido: {new Date(pedido.fechaPedido).toLocaleDateString()}
                      </div> */}
                      <div className="text-sm text-gray-500">
                        Entrega: {new Date(pedido.fechaEntrega).toLocaleDateString()}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getConductorName(pedido.idConductor || '')}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      ${(pedido.productos ?? []).reduce((sum, p) => sum + (p.cantidadM3 * p.precioUnitario), 0).toLocaleString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(pedido.estado)}`}>
                      {(pedido.estado ?? '').replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedPedido(pedido);
                          setShowDetailsModal(true);
                        }}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Eye size={16} />
                      </button>
                      <select
                        value={pedido.estado}
                        onChange={(e) => handleUpdateEstado(pedido.idPedido, e.target.value as EstadoPedido)}
                        className="text-xs border border-gray-300 rounded px-2 py-1"
                      >
                        {Object.values(EstadoPedido).map((estado) => (
                          <option key={estado} value={estado}>
                            {(estado ?? '').replace('_', ' ')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear pedido */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-10 mx-auto p-5 border w-full max-w-2xl shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Nuevo Pedido</h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cliente</label>
                  <select
                    required
                    value={formData.idCliente}
                    onChange={(e) => setFormData({ ...formData, idCliente: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Seleccionar cliente</option>
                    {clientes.map((cliente) => (
                      <option key={cliente.id} value={cliente.id}>
                        {cliente.nombreEmpresa}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Obra</label>
                  <select
                    required
                    value={formData.idObra}
                    onChange={(e) => setFormData({ ...formData, idObra: e.target.value })}
                    className="input-field"
                  >
                    <option value="">Seleccionar obra</option>
                    {obras
                      .filter((obra) => obra.idCliente === formData.idCliente)
                      .map((obra) => (
                        <option key={obra.idObra} value={obra.idObra}>
                          {obra.nombreObra}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Fecha de Entrega</label>
                  <input
                    type="date"
                    required
                    value={formData.fechaEntrega}
                    onChange={(e) => setFormData({ ...formData, fechaEntrega: e.target.value })}
                    className="input-field"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Productos</label>
                {formData.productos.map((producto, index) => (
                  <div key={index} className="flex gap-2 mb-2">
                    <select
                      required
                      value={producto.idProducto}
                      onChange={(e) => updateProducto(index, 'idProducto', e.target.value)}
                      className="input-field flex-1"
                    >
                      <option value="">Seleccionar producto</option>
                      {productos.map((p) => (
                        <option key={p.idProducto} value={p.idProducto}>
                          {p.nombreComercial} - ${p.precioBase}
                        </option>
                      ))}
                    </select>
                    <input
                      type="number"
                      min="1"
                      required
                      value={producto.cantidadM3}
                      onChange={(e) => updateProducto(index, 'cantidadM3', parseFloat(e.target.value))}
                      className="input-field w-20"
                      placeholder="m³"
                    />
                    <input
                      type="text"
                      placeholder="Observaciones"
                      value={producto.observaciones}
                      onChange={(e) => updateProducto(index, 'observaciones', e.target.value)}
                      className="input-field flex-1"
                    />
                    <button
                      type="button"
                      onClick={() => removeProducto(index)}
                      className="btn-danger px-2"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProducto}
                  className="btn-secondary text-sm"
                >
                  + Agregar Producto
                </button>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  Crear Pedido
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal de detalles del pedido */}
      {showDetailsModal && selectedPedido && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">Detalles del Pedido</h3>
              <button
                onClick={() => {
                  setShowDetailsModal(false);
                  setSelectedPedido(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">ID Pedido</label>
                <p className="text-sm text-gray-900">{selectedPedido.idPedido}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <p className="text-sm text-gray-900">{getClienteName(selectedPedido.idCliente)}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Conductor</label>
                <select
                  value={selectedPedido.idConductor || ''}
                  onChange={(e) => handleAsignarConductor(selectedPedido.idPedido, e.target.value)}
                  className="input-field"
                >
                  <option value="">Sin asignar</option>
                  {conductores.map((conductor) => (
                    <option key={conductor.id} value={conductor.id}>
                      {conductor.nombre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Productos</label>
                <div className="space-y-2">
                  {selectedPedido.productos.map((producto, index) => {
                    const prod = productos.find(p => p.idProducto === producto.idProducto);
                    return (
                      <div key={index} className="text-sm text-gray-900">
                        {prod?.nombreComercial} - {producto.cantidadM3} m³ x ${producto.precioUnitario} = ${(producto.cantidadM3 * producto.precioUnitario).toLocaleString()}
                        {producto.observaciones && <span className="ml-2 text-xs text-gray-500">({producto.observaciones})</span>}
                      </div>
                    );
                  })}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Total</label>
                <p className="text-lg font-bold text-gray-900">${(selectedPedido.productos ?? []).reduce((sum, p) => sum + (p.cantidadM3 * p.precioUnitario), 0).toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Pedidos; 