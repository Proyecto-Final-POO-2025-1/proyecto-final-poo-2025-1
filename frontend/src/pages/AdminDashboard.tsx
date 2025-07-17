import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';
import { Package, Settings, Building, FileText, Users, Truck } from 'lucide-react';

const adminMenu = [
  { name: 'Productos', href: '/admin/productos', icon: Package },
  { name: 'Pedidos', href: '/admin/pedidos', icon: Settings },
  { name: 'Vehículos', href: '/admin/vehiculos', icon: Building },
  { name: 'Obras', href: '/admin/obras', icon: FileText },
  { name: 'Clientes', href: '/admin/clientes', icon: Users },
  { name: 'Conductores', href: '/admin/conductores', icon: Truck },
];

const AdminDashboard: React.FC = () => {
  return (
    <DashboardLayout
      title="Panel Administrador"
      navigation={adminMenu}
    >
      <Outlet />
    </DashboardLayout>
  );
};

export default AdminDashboard; 