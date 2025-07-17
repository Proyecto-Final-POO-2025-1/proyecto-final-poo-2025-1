import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import toast from 'react-hot-toast';

const checklistItems = [
  'Luces',
  'Frenos',
  'Llantas',
  'Niveles de aceite',
  'Extintor',
  'Espejos',
  'Cinturón de seguridad',
];

const ConductorChecklist: React.FC = () => {
  const { user, currentPlanta } = useAuth();
  const [enviadoHoy, setEnviadoHoy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<{ [k: string]: boolean }>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user?.uid && currentPlanta) {
      checkChecklistHoy(user.uid);
    }
  }, [user, currentPlanta]);

  const checkChecklistHoy = async (uid: string) => {
    setLoading(true);
    try {
      // Stub: simula consulta al backend
      const today = new Date().toISOString().slice(0, 10);
      const key = `checklist_${uid}_${today}`;
      setEnviadoHoy(!!localStorage.getItem(key));
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (item: string, checked: boolean) => {
    setForm({ ...form, [item]: checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user?.uid) return;
    setSaving(true);
    try {
      // Stub: simula guardado en backend
      const today = new Date().toISOString().slice(0, 10);
      const key = `checklist_${user.uid}_${today}`;
      localStorage.setItem(key, JSON.stringify(form));
      // await api.enviarChecklist(currentPlanta, user.uid, form); // Real API
      toast.success('Checklist enviado');
      setEnviadoHoy(true);
    } catch (e) {
      toast.error('Error al enviar checklist');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Checklist Vehículo</h1>
      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
        </div>
      ) : enviadoHoy ? (
        <div className="bg-green-100 text-green-800 p-4 rounded">Ya enviaste el checklist hoy. ¡Gracias!</div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 max-w-md mx-auto space-y-4">
          {checklistItems.map(item => (
            <div key={item} className="flex items-center gap-2">
              <input
                type="checkbox"
                id={item}
                checked={!!form[item]}
                onChange={e => handleChange(item, e.target.checked)}
                disabled={saving}
              />
              <label htmlFor={item} className="text-gray-700">{item}</label>
            </div>
          ))}
          <button type="submit" className="btn-primary mt-4" disabled={saving}>Enviar checklist</button>
        </form>
      )}
    </div>
  );
};

export default ConductorChecklist; 