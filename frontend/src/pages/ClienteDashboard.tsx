import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import ClienteWhatsAppButton from '../ClienteWhatsAppButton';
import { FileText, Map } from 'lucide-react';

const clienteMenu = [
  { name: 'Mis Pedidos', href: '/cliente/pedidos', icon: FileText },
  { name: 'Mapa de Conductores', href: '/cliente/mapa', icon: Map },
];

const ClienteDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Panel Cliente"
      navigation={clienteMenu}
      floatingButton={<ClienteWhatsAppButton />}
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default ClienteDashboard; 