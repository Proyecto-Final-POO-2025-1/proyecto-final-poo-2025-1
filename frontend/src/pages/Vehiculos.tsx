import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Vehiculo } from '../types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Vehiculos: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [vehiculos, setVehiculos] = useState<Vehiculo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingVehiculo, setEditingVehiculo] = useState<Vehiculo | null>(null);
  const [formData, setFormData] = useState({
    placa: '',
    marca: '',
    modelo: '',
    capacidad: 0,
    estado: 'DISPONIBLE',
  });

  useEffect(() => {
    if (currentPlanta) {
      fetchVehiculos();
    }
  }, [currentPlanta]);

  const fetchVehiculos = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      const data = await api.getVehiculos(currentPlanta);
      setVehiculos(data);
    } catch (error) {
      console.error('Error al cargar vehículos:', error);
      toast.error('Error al cargar los vehículos');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlanta) return;

    try {
      if (editingVehiculo) {
        const updatedVehiculo = { ...editingVehiculo, ...formData };
        await api.updateVehiculo(currentPlanta, updatedVehiculo);
        toast.success('Vehículo actualizado correctamente');
      } else {
        await api.createVehiculo(currentPlanta, formData);
        toast.success('Vehículo creado correctamente');
      }
      
      setShowModal(false);
      setEditingVehiculo(null);
      resetForm();
      fetchVehiculos();
    } catch (error) {
      console.error('Error al guardar vehículo:', error);
      toast.error('Error al guardar el vehículo');
    }
  };

  const handleEdit = (vehiculo: Vehiculo) => {
    setEditingVehiculo(vehiculo);
    setFormData({
      placa: vehiculo.placa,
      marca: vehiculo.marca,
      modelo: vehiculo.modelo,
      capacidad: vehiculo.capacidad,
      estado: vehiculo.estado,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!currentPlanta || !window.confirm('¿Estás seguro de que quieres eliminar este vehículo?')) return;

    try {
      await api.deleteVehiculo(currentPlanta, id);
      toast.success('Vehículo eliminado correctamente');
      fetchVehiculos();
    } catch (error) {
      console.error('Error al eliminar vehículo:', error);
      toast.error('Error al eliminar el vehículo');
    }
  };

  const resetForm = () => {
    setFormData({
      placa: '',
      marca: '',
      modelo: '',
      capacidad: 0,
      estado: 'DISPONIBLE',
    });
  };

  const filteredVehiculos = vehiculos.filter(vehiculo =>
    vehiculo.placa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.marca.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vehiculo.modelo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'DISPONIBLE':
        return 'bg-green-100 text-green-800';
      case 'EN_USO':
        return 'bg-blue-100 text-blue-800';
      case 'MANTENIMIENTO':
        return 'bg-yellow-100 text-yellow-800';
      case 'FUERA_DE_SERVICIO':
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
        <h1 className="text-2xl font-bold text-gray-900">Vehículos</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Vehículo
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar vehículos..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabla de vehículos */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vehículo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Placa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Capacidad
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
              {filteredVehiculos.map((vehiculo) => (
                <tr key={vehiculo.idVehiculo} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{vehiculo.marca}</div>
                      <div className="text-sm text-gray-500">{vehiculo.modelo}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{vehiculo.placa}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{vehiculo.capacidad} m³</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(vehiculo.estado)}`}>
                      {vehiculo.estado.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(vehiculo)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(vehiculo.idVehiculo)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear/editar vehículo */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingVehiculo ? 'Editar Vehículo' : 'Nuevo Vehículo'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingVehiculo(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Placa</label>
                <input
                  type="text"
                  required
                  value={formData.placa}
                  onChange={(e) => setFormData({ ...formData, placa: e.target.value.toUpperCase() })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Marca</label>
                <input
                  type="text"
                  required
                  value={formData.marca}
                  onChange={(e) => setFormData({ ...formData, marca: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Modelo</label>
                <input
                  type="text"
                  required
                  value={formData.modelo}
                  onChange={(e) => setFormData({ ...formData, modelo: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Capacidad (m³)</label>
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  required
                  value={formData.capacidad}
                  onChange={(e) => setFormData({ ...formData, capacidad: parseFloat(e.target.value) })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  value={formData.estado}
                  onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                  className="input-field"
                >
                  <option value="DISPONIBLE">Disponible</option>
                  <option value="EN_USO">En uso</option>
                  <option value="MANTENIMIENTO">Mantenimiento</option>
                  <option value="FUERA_DE_SERVICIO">Fuera de servicio</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingVehiculo(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingVehiculo ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vehiculos; 