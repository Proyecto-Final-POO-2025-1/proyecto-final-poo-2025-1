import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Conductor } from '../types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

type FormConductor = {
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
  licenciaConduccion: string;
  activo: boolean;
};

const Conductores: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [conductores, setConductores] = useState<Conductor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingConductor, setEditingConductor] = useState<Conductor | null>(null);
  const [formData, setFormData] = useState<FormConductor>({
    nombre: '',
    email: '',
    telefono: '',
    dni: '',
    licenciaConduccion: '',
    activo: true,
  });

  useEffect(() => {
    if (currentPlanta) {
      fetchConductores();
    }
  }, [currentPlanta]);

  const fetchConductores = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      const data = await api.getConductores(currentPlanta);
      setConductores(data);
    } catch (error) {
      console.error('Error al cargar conductores:', error);
      toast.error('Error al cargar los conductores');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlanta) return;

    try {
      if (editingConductor) {
        const updatedConductor = { ...editingConductor, ...formData };
        await api.updateConductor(currentPlanta, updatedConductor);
        toast.success('Conductor actualizado correctamente');
      } else {
        await api.createConductor(currentPlanta, formData);
        toast.success('Conductor creado correctamente');
      }
      
      setShowModal(false);
      setEditingConductor(null);
      resetForm();
      fetchConductores();
    } catch (error) {
      console.error('Error al guardar conductor:', error);
      toast.error('Error al guardar el conductor');
    }
  };

  const handleEdit = (conductor: Conductor) => {
    setEditingConductor(conductor);
    setFormData({
      nombre: conductor.nombre,
      email: conductor.email,
      telefono: conductor.telefono,
      dni: conductor.dni,
      licenciaConduccion: conductor.licenciaConduccion,
      activo: conductor.activo,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!currentPlanta || !window.confirm('¿Estás seguro de que quieres eliminar este conductor?')) return;

    try {
      await api.deleteConductor(currentPlanta, id);
      toast.success('Conductor eliminado correctamente');
      fetchConductores();
    } catch (error) {
      console.error('Error al eliminar conductor:', error);
      toast.error('Error al eliminar el conductor');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      dni: '',
      licenciaConduccion: '',
      activo: true,
    });
  };

  const filteredConductores = conductores.filter(conductor =>
    conductor.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conductor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conductor.licenciaConduccion.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        <h1 className="text-2xl font-bold text-gray-900">Conductores</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Conductor
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar conductores..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabla de conductores */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Conductor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Licencia
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
              {filteredConductores.map((conductor) => (
                <tr key={conductor.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{conductor.nombre}</div>
                      <div className="text-sm text-gray-500">{conductor.dni}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{conductor.email}</div>
                      <div className="text-sm text-gray-500">{conductor.telefono}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{conductor.licenciaConduccion}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      conductor.activo
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {conductor.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(conductor)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(conductor.id)}
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

      {/* Modal para crear/editar conductor */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingConductor ? 'Editar Conductor' : 'Nuevo Conductor'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingConductor(null);
                  resetForm();
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre</label>
                <input
                  type="text"
                  required
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Teléfono</label>
                <input
                  type="tel"
                  required
                  value={formData.telefono}
                  onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">DNI</label>
                <input
                  type="text"
                  required
                  value={formData.dni}
                  onChange={(e) => setFormData({ ...formData, dni: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Número de Licencia</label>
                <input
                  type="text"
                  required
                  value={formData.licenciaConduccion}
                  onChange={(e) => setFormData({ ...formData, licenciaConduccion: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  className="input-field"
                  value={formData.activo ? 'ACTIVO' : 'INACTIVO'}
                  onChange={e => setFormData({ ...formData, activo: e.target.value === 'ACTIVO' })}
                  required
                >
                  <option value="ACTIVO">Activo</option>
                  <option value="INACTIVO">Inactivo</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingConductor(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingConductor ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conductores; 