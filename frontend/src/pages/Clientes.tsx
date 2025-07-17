import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Cliente } from '../types';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ClienteConPasswordDTO } from '../services/api';

const Clientes: React.FC = () => {
  const { currentPlanta } = useAuth();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCliente, setEditingCliente] = useState<Cliente | null>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    dni: '',
    nitEmpresa: '',
    nombreEmpresa: '',
    obrasAsociadasIds: [] as string[],
  });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  useEffect(() => {
    if (currentPlanta) {
      fetchClientes();
    }
  }, [currentPlanta]);

  const fetchClientes = async () => {
    if (!currentPlanta) return;
    
    try {
      setLoading(true);
      const data = await api.getClientes(currentPlanta);
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
      toast.error('Error al cargar los clientes');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPlanta) return;

    try {
      if (editingCliente) {
        const updatedCliente = { ...editingCliente, ...formData };
        await api.updateCliente(currentPlanta, updatedCliente);
        toast.success('Cliente actualizado correctamente');
      } else {
        const response: ClienteConPasswordDTO = await api.createCliente(currentPlanta, formData);
        setGeneratedPassword(response.password);
        setCreatedEmail(response.cliente.email);
        setShowPasswordModal(true);
        toast.success('Cliente creado correctamente');
      }
      
      setShowModal(false);
      setEditingCliente(null);
      resetForm();
      fetchClientes();
    } catch (error) {
      console.error('Error al guardar cliente:', error);
      toast.error('Error al guardar el cliente');
    }
  };

  const handleEdit = (cliente: Cliente) => {
    setEditingCliente(cliente);
    setFormData({
      nombre: cliente.nombre,
      email: cliente.email,
      telefono: cliente.telefono,
      dni: cliente.dni,
      nitEmpresa: cliente.nitEmpresa,
      nombreEmpresa: cliente.nombreEmpresa,
      obrasAsociadasIds: cliente.obrasAsociadasIds || [],
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!currentPlanta || !window.confirm('¿Estás seguro de que quieres eliminar este cliente?')) return;

    try {
      await api.deleteCliente(currentPlanta, id);
      toast.success('Cliente eliminado correctamente');
      fetchClientes();
    } catch (error) {
      console.error('Error al eliminar cliente:', error);
      toast.error('Error al eliminar el cliente');
    }
  };

  const resetForm = () => {
    setFormData({
      nombre: '',
      email: '',
      telefono: '',
      dni: '',
      nitEmpresa: '',
      nombreEmpresa: '',
      obrasAsociadasIds: [],
    });
  };

  const filteredClientes = clientes.filter(cliente =>
    cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.nombreEmpresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
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
        <h1 className="text-2xl font-bold text-gray-900">Clientes</h1>
        <button
          onClick={() => setShowModal(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={20} />
          Nuevo Cliente
        </button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        <input
          type="text"
          placeholder="Buscar clientes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="input-field pl-10"
        />
      </div>

      {/* Tabla de clientes */}
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Cliente
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contacto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  NIT
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredClientes.map((cliente) => (
                <tr key={cliente.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                      <div className="text-sm text-gray-500">{cliente.dni}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{cliente.nombreEmpresa}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{cliente.email}</div>
                      <div className="text-sm text-gray-500">{cliente.telefono}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {cliente.nitEmpresa}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEdit(cliente)}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(cliente.id)}
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

      {/* Modal para crear/editar cliente */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                {editingCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditingCliente(null);
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
                <label className="block text-sm font-medium text-gray-700">NIT Empresa</label>
                <input
                  type="text"
                  required
                  value={formData.nitEmpresa}
                  onChange={(e) => setFormData({ ...formData, nitEmpresa: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre Empresa</label>
                <input
                  type="text"
                  required
                  value={formData.nombreEmpresa}
                  onChange={(e) => setFormData({ ...formData, nombreEmpresa: e.target.value })}
                  className="input-field"
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingCliente(null);
                    resetForm();
                  }}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-primary">
                  {editingCliente ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal para mostrar la contraseña generada */}
      {showPasswordModal && generatedPassword && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-40 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h3 className="text-lg font-bold mb-4 text-center text-primary-700">Cliente creado</h3>
            <p className="mb-2 text-center">Correo: <span className="font-semibold">{createdEmail}</span></p>
            <p className="mb-2 text-center">Contraseña generada:</p>
            <div className="flex items-center justify-center gap-2 mb-4">
              <input
                type="text"
                value={generatedPassword}
                readOnly
                className="input-field text-center font-mono w-48"
              />
              <button
                onClick={() => {
                  navigator.clipboard.writeText(generatedPassword);
                  toast.success('Contraseña copiada');
                }}
                className="btn-secondary px-2 py-1"
              >
                Copiar
              </button>
            </div>
            <p className="text-xs text-gray-500 text-center mb-4">Entrega esta contraseña al cliente. Solo se mostrará una vez.</p>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  setShowPasswordModal(false);
                  setGeneratedPassword(null);
                  setCreatedEmail(null);
                }}
                className="btn-primary"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientes; 