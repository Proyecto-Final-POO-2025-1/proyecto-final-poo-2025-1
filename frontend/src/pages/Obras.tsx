import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Obra, Cliente } from '../types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';

const Obras: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [obras, setObras] = useState<Obra[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingObra, setEditingObra] = useState<Obra | null>(null);
  const [formData, setFormData] = useState({
    nombreObra: '',
    direccion: '',
    municipio: '',
    ubicacion: { latitud: '', longitud: '', descripcion: '' },
    idCliente: '',
    estado: 'ACTIVA',
    fechaInicio: '',
  });

  useEffect(() => {
    if (currentPlanta) {
      fetchObras();
      fetchClientes();
    }
  }, [currentPlanta]);

  const fetchObras = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      const data = await api.getObras(currentPlanta);
      setObras(data);
    } catch (error) {
      console.error('Error al cargar obras:', error);
      toast.error('Error al cargar las obras');
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPlanta) return;
    const ubicacion = {
      latitud: Number(formData.ubicacion.latitud),
      longitud: Number(formData.ubicacion.longitud),
      descripcion: formData.ubicacion.descripcion,
    };
    const obraPayload = {
      ...formData,
      ubicacion,
    };
    try {
      if (editingObra) {
        const updatedObra = { ...editingObra, ...obraPayload };
        await api.updateObra(currentPlanta, updatedObra);
        toast.success('Obra actualizada correctamente');
      } else {
        await api.createObra(currentPlanta, obraPayload);
        toast.success('Obra creada correctamente');
      }
      setShowModal(false);
      setEditingObra(null);
      resetForm();
      fetchObras();
    } catch (error) {
      console.error('Error al guardar obra:', error);
      toast.error('Error al guardar la obra');
    }
  };

  const handleEdit = (obra: Obra) => {
    setEditingObra(obra);
    setFormData({
      nombreObra: obra.nombreObra,
      direccion: obra.direccion,
      municipio: obra.municipio || '',
      ubicacion: {
        latitud: obra.ubicacion?.latitud?.toString() || '',
        longitud: obra.ubicacion?.longitud?.toString() || '',
        descripcion: obra.ubicacion?.descripcion || '',
      },
      idCliente: obra.idCliente,
      estado: obra.estado,
      fechaInicio: obra.fechaInicio,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!currentPlanta || !window.confirm('¿Estás seguro de que quieres eliminar esta obra?')) return;

    try {
      await api.deleteObra(currentPlanta, id);
      toast.success('Obra eliminada correctamente');
      fetchObras();
    } catch (error) {
      console.error('Error al eliminar obra:', error);
      toast.error('Error al eliminar la obra');
    }
  };

  const resetForm = () => {
    setFormData({
      nombreObra: '',
      direccion: '',
      municipio: '',
      ubicacion: { latitud: '', longitud: '', descripcion: '' },
      idCliente: '',
      estado: 'ACTIVA',
      fechaInicio: '',
    });
  };

  const filteredObras = obras.filter(obra =>
    (obra.nombreObra?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
    (obra.direccion?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const getClienteName = (idCliente: string) => {
    const cliente = clientes.find(c => c.id === idCliente);
    return cliente ? cliente.nombreEmpresa : 'Cliente no encontrado';
  };

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'ACTIVA':
        return 'bg-green-100 text-green-800';
      case 'COMPLETADA':
        return 'bg-blue-100 text-blue-800';
      case 'SUSPENDIDA':
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
        <h1 className="text-2xl font-bold text-gray-900">Obras</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nueva Obra
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar obras..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabla de obras */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Obra
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Dirección
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Municipio
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fechas
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
              {filteredObras.map((obra) => (
                <tr key={obra.idObra} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{obra.nombreObra}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{getClienteName(obra.idCliente)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{obra.direccion}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{obra.municipio}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      Inicio: {new Date(obra.fechaInicio).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getEstadoColor(obra.estado)}`}>
                      {obra.estado}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      className="text-blue-600 hover:text-blue-900 mr-2"
                      onClick={() => handleEdit(obra)}
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => handleDelete(obra.idObra)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para crear/editar obra */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
          <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-lg relative">
            <button
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setShowModal(false);
                setEditingObra(null);
                resetForm();
              }}
            >
              <X size={24} />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingObra ? 'Editar Obra' : 'Nueva Obra'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre de Obra</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.nombreObra}
                  onChange={e => setFormData({ ...formData, nombreObra: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Dirección</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.direccion}
                  onChange={e => setFormData({ ...formData, direccion: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Municipio</label>
                <input
                  type="text"
                  className="input-field"
                  value={formData.municipio}
                  onChange={e => setFormData({ ...formData, municipio: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Ubicación</label>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="any"
                    placeholder="Latitud"
                    className="input-field"
                    value={formData.ubicacion.latitud}
                    onChange={e => setFormData({ ...formData, ubicacion: { ...formData.ubicacion, latitud: e.target.value } })}
                    required
                  />
                  <input
                    type="number"
                    step="any"
                    placeholder="Longitud"
                    className="input-field"
                    value={formData.ubicacion.longitud}
                    onChange={e => setFormData({ ...formData, ubicacion: { ...formData.ubicacion, longitud: e.target.value } })}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Descripción de la ubicación"
                  className="input-field mt-2"
                  value={formData.ubicacion.descripcion}
                  onChange={e => setFormData({ ...formData, ubicacion: { ...formData.ubicacion, descripcion: e.target.value } })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Cliente</label>
                <select
                  className="input-field"
                  value={formData.idCliente}
                  onChange={e => setFormData({ ...formData, idCliente: e.target.value })}
                  required
                >
                  <option value="">Selecciona un cliente</option>
                  {clientes.map(cliente => (
                    <option key={cliente.id} value={cliente.id}>{cliente.nombreEmpresa}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Estado</label>
                <select
                  className="input-field"
                  value={formData.estado}
                  onChange={e => setFormData({ ...formData, estado: e.target.value })}
                  required
                >
                  <option value="ACTIVA">Activa</option>
                  <option value="COMPLETADA">Completada</option>
                  <option value="SUSPENDIDA">Suspendida</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Fecha de inicio</label>
                <input
                  type="date"
                  className="input-field"
                  value={formData.fechaInicio}
                  onChange={e => setFormData({ ...formData, fechaInicio: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => {
                    setShowModal(false);
                    setEditingObra(null);
                    resetForm();
                  }}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingObra ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Obras; 