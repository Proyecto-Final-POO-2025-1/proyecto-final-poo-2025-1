import axios from 'axios';
import { auth } from '../firebase';
import {
  Cliente,
  Conductor,
  Producto,
  Vehiculo,
  Obra,
  Pedido,
  Planta,
  EstadoPedido,
  AuthenticatedUser,
  VehiculoConConductor
} from '../types';

const API_BASE_URL = 'http://localhost:8080';

// Configurar axios para incluir el token de Firebase en todas las peticiones
axios.interceptors.request.use(async (config) => {
  const user = auth.currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const api = {
  // Autenticación
  async login(idToken: string, idPlanta: string): Promise<AuthenticatedUser> {
    console.log('🌐 API: Iniciando llamada al backend...');
    console.log('📡 URL:', `${API_BASE_URL}/${idPlanta}/auth/login`);
    console.log('🎫 Token (primeros 20 chars):', idToken.substring(0, 20) + '...');
    
    try {
      const response = await axios.post(`${API_BASE_URL}/${idPlanta}/auth/login`, {
        idToken
      });
      console.log('✅ API: Respuesta exitosa del backend');
      console.log('📄 Datos de respuesta:', response.data);
      return response.data;
    } catch (error: any) {
      console.error('❌ API: Error en la llamada al backend');
      console.error('🔍 Detalles del error:', {
        status: error?.response?.status,
        statusText: error?.response?.statusText,
        data: error?.response?.data,
        message: error?.message
      });
      throw error;
    }
  },

  // Plantas
  async getPlantas(): Promise<Planta[]> {
    const response = await axios.get(`${API_BASE_URL}/api/plantas`);
    return response.data;
  },

  // Clientes
  async getClientes(idPlanta: string): Promise<Cliente[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/clientes`);
    return response.data;
  },

  async getCliente(idPlanta: string, idCliente: string): Promise<Cliente> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/clientes/${idCliente}`);
    return response.data;
  },

  async createCliente(idPlanta: string, cliente: Omit<Cliente, 'id'>): Promise<Cliente> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/clientes`, cliente);
    return response.data;
  },

  async updateCliente(idPlanta: string, cliente: Cliente): Promise<Cliente> {
    const response = await axios.put(`${API_BASE_URL}/${idPlanta}/administrador/clientes/${cliente.id}`, cliente);
    return response.data;
  },

  async deleteCliente(idPlanta: string, idCliente: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${idPlanta}/administrador/clientes/${idCliente}`);
  },

  // Conductores
  async getConductores(idPlanta: string): Promise<Conductor[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/conductores`);
    return response.data;
  },

  async getConductor(idPlanta: string, idConductor: string): Promise<Conductor> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/conductores/${idConductor}`);
    return response.data;
  },

  async createConductor(idPlanta: string, conductor: Omit<Conductor, 'id'>): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/conductores`, conductor);
    return response.data;
  },

  async updateConductor(idPlanta: string, conductor: Conductor): Promise<Conductor> {
    const response = await axios.put(`${API_BASE_URL}/${idPlanta}/administrador/conductores/${conductor.id}`, conductor);
    return response.data;
  },

  async deleteConductor(idPlanta: string, idConductor: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${idPlanta}/administrador/conductores/${idConductor}`);
  },

  // Productos
  async getProductos(idPlanta: string): Promise<Producto[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/productos`);
    return response.data;
  },

  async getProducto(idPlanta: string, idProducto: string): Promise<Producto> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/productos/${idProducto}`);
    return response.data;
  },

  async createProducto(idPlanta: string, producto: Omit<Producto, 'idProducto'>): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/productos`, producto);
    return response.data;
  },

  async updateProducto(idPlanta: string, producto: Producto): Promise<Producto> {
    const response = await axios.put(`${API_BASE_URL}/${idPlanta}/administrador/productos/${producto.idProducto}`, producto);
    return response.data;
  },

  async deleteProducto(idPlanta: string, idProducto: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${idPlanta}/administrador/productos/${idProducto}`);
  },

  // Vehículos
  async getVehiculos(idPlanta: string): Promise<Vehiculo[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos`);
    return response.data;
  },

  async getVehiculosConConductores(idPlanta: string): Promise<VehiculoConConductor[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos/con-conductores`);
    return response.data;
  },

  async getVehiculo(idPlanta: string, idVehiculo: string): Promise<Vehiculo> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos/${idVehiculo}`);
    return response.data;
  },

  async createVehiculo(idPlanta: string, vehiculo: Omit<Vehiculo, 'idVehiculo'>): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos`, vehiculo);
    return response.data;
  },

  async updateVehiculo(idPlanta: string, vehiculo: Vehiculo): Promise<Vehiculo> {
    const response = await axios.put(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos/${vehiculo.idVehiculo}`, vehiculo);
    return response.data;
  },

  async deleteVehiculo(idPlanta: string, idVehiculo: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${idPlanta}/administrador/vehiculos/${idVehiculo}`);
  },

  // Obras
  async getObras(idPlanta: string, idCliente?: string): Promise<Obra[]> {
    const url = idCliente 
      ? `${API_BASE_URL}/${idPlanta}/administrador/obras?idCliente=${idCliente}`
      : `${API_BASE_URL}/${idPlanta}/administrador/obras`;
    const response = await axios.get(url);
    return response.data;
  },

  async getObra(idPlanta: string, idObra: string): Promise<Obra> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/obras/${idObra}`);
    return response.data;
  },

  async createObra(idPlanta: string, obra: Omit<Obra, 'idObra'>): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/obras`, obra);
    return response.data;
  },

  async updateObra(idPlanta: string, obra: Obra): Promise<Obra> {
    const response = await axios.put(`${API_BASE_URL}/${idPlanta}/administrador/obras/${obra.idObra}`, obra);
    return response.data;
  },

  async deleteObra(idPlanta: string, idObra: string): Promise<void> {
    await axios.delete(`${API_BASE_URL}/${idPlanta}/administrador/obras/${idObra}`);
  },

  // Pedidos
  async getPedidos(idPlanta: string): Promise<Pedido[]> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/pedidos`);
    return response.data;
  },

  async getPedido(idPlanta: string, idPedido: string): Promise<Pedido> {
    const response = await axios.get(`${API_BASE_URL}/${idPlanta}/administrador/pedidos/${idPedido}`);
    return response.data;
  },

  async createPedido(idPlanta: string, pedido: Omit<Pedido, 'idPedido'>): Promise<string> {
    const response = await axios.post(`${API_BASE_URL}/${idPlanta}/administrador/pedidos`, pedido);
    return response.data;
  },

  async updateEstadoPedido(idPlanta: string, idPedido: string, estado: EstadoPedido): Promise<void> {
    await axios.patch(`${API_BASE_URL}/${idPlanta}/administrador/pedidos/${idPedido}/estado`, null, {
      params: { nuevoEstado: estado }
    });
  },

  async asignarConductor(idPlanta: string, idPedido: string, idConductor: string): Promise<void> {
    await axios.patch(`${API_BASE_URL}/${idPlanta}/administrador/pedidos/${idPedido}/conductor`, null, {
      params: { idConductor }
    });
  }
}; 