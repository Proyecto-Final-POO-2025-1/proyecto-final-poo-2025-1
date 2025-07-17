import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Pedido } from '../types';
import toast from 'react-hot-toast';

const ConductorNovedades: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [pedidoActivo, setPedidoActivo] = useState<Pedido | null>(null);
  const [loading, setLoading] = useState(true);
  const [novedad, setNovedad] = useState('');
  const [enviada, setEnviada] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid && currentPlanta) {
      fetchPedidoActivo(user.uid, currentPlanta);
    }
  }, [user, currentPlanta]);

  const fetchPedidoActivo = async (uid: string, idPlanta: string) => {
    setLoading(true);
    try {
      const pedidos = await api.getPedidos(idPlanta);
      const activo = pedidos.find((p: Pedido) => p.idConductor === uid && (p.estado === 'CARGANDO' || p.estado === 'EN_CAMINO'));
      setPedidoActivo(activo || null);
      if (activo) {
        const key = `novedad_${uid}_${activo.idPedido}`;
        setEnviada(!!localStorage.getItem(key));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid || !pedidoActivo) return;
    setSaving(true);
    try {
      // Stub: simula guardado en backend
      const key = `novedad_${user.uid}_${pedidoActivo.idPedido}`;
      localStorage.setItem(key, novedad);
      // await api.enviarNovedad(currentPlanta, pedidoActivo.idPedido, novedad); // Real API
      toast.success('Novedad reportada');
      setEnviada(true);
    } catch (e) {
      toast.error('Error al reportar novedad');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Reportar Novedad</h1>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      ) : !pedidoActivo ? (
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded">No tienes pedidos en curso para reportar novedades.</div>
      ) : enviada ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">Ya reportaste una novedad para este pedido.</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-md mx-auto space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Pedido en curso: <span className="font-bold">{pedidoActivo.idPedido}</span></label>
            <textarea
              className="input-field w-full"
              rows={4}
              placeholder="Describe la novedad o incidencia..."
              value={novedad}
              onChange={e => setNovedad(e.target.value)}
              required
              disabled={saving}
            />
          </div>
          <button type="submit" className="btn-primary mt-4" disabled={saving}>Reportar novedad</button>
        </form>
      )}
    </div>
  );
};

export default ConductorNovedades; 