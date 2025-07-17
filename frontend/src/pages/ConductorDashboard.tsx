import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { FileText, ClipboardList, AlertTriangle } from 'lucide-react';

const conductorMenu = [
  { name: 'Pedidos Asignados', href: '/conductor/pedidos', icon: FileText },
  { name: 'Checklist Vehículo', href: '/conductor/checklist', icon: ClipboardList },
  { name: 'Reportar Novedad', href: '/conductor/novedad', icon: AlertTriangle },
];

const ConductorDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Panel Conductor"
      navigation={conductorMenu}
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default ConductorDashboard; 