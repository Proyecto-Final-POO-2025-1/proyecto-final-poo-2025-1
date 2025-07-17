import React, { useEffect, useState, ChangeEvent } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido } from '../types';
import toast from 'react-hot-toast';

const ConductorEvidencia: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [pedidoEntregado, setPedidoEntregado] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [enviada, setEnviada] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid && currentPlanta) {
      fetchPedidoEntregado(user.uid, currentPlanta);
    }
  }, [user, currentPlanta]);

  const fetchPedidoEntregado = async (uid: string, idPlanta: string) => {
    setLoading(true);
    try {
      const pedidos = await api.getPedidos(idPlanta);
      // Buscar el pedido entregado más reciente
      const entregados = pedidos.filter((p: Pedido) => p.idConductor === uid && p.estado === 'ENTREGADO');
      const masReciente = entregados.sort((a, b) => new Date(b.fechaEntrega).getTime() - new Date(a.fechaEntrega).getTime())[0];
      setPedidoEntregado(masReciente || null);
      if (masReciente) {
        const key = `evidencia_${uid}_${masReciente.idPedido}`;
        setEnviada(!!localStorage.getItem(key));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (!selected.type.startsWith('image/')) {
        toast.error('Solo se permiten imágenes');
        return;
      }
      setFile(selected);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !pedidoEntregado || !file) return;
    setSaving(true);
    try {
      // Stub: simula guardado en backend
      const key = `evidencia_${user.uid}_${pedidoEntregado.idPedido}`;
      localStorage.setItem(key, file.name);
      // await api.subirEvidencia(currentPlanta, pedidoEntregado.idPedido, file); // Real API
      toast.success('Evidencia subida');
      setEnviada(true);
    } catch (e) {
      toast.error('Error al subir evidencia');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Subir Evidencia de Entrega</h1>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      ) : !pedidoEntregado ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">No tienes pedidos entregados para subir evidencia.</div>
      ) : enviada ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">Ya subiste evidencia para este pedido.</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Pedido entregado: <span className="font-bold">{pedidoEntregado.idPedido}</span></label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={saving}
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-primary mt-4" disabled={saving || !file}>Subir evidencia</button>
        </form>
      )}
    </div>
  );
};

export default ConductorEvidencia; 