export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  dni: string;
}

export interface Cliente extends Usuario {
  nitEmpresa: string;
  nombreEmpresa: string;
  obrasAsociadasIds: string[];
}

export interface Conductor extends Usuario {
  licenciaConduccion: string;
  activo: boolean;
}

export interface Producto {
  idProducto: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  unidad: string;
}

export interface Vehiculo {
  idVehiculo: string;
  placa: string;
  marca: string;
  modelo: string;
  capacidad: number;
  estado: string;
}

export interface Obra {
  idObra: string;
  nombre: string;
  direccion: string;
  municipio: string;
  ubicacion: Ubicacion;
  idCliente: string;
  estado: string;
  fechaInicio: string;
}

export interface Pedido {
  idPedido: string;
  idCliente: string;
  idObra: string;
  idConductor?: string;
  idVehiculo?: string;
  fechaPedido: string;
  fechaEntrega: string;
  estado: EstadoPedido;
  productos: ProductoPedido[];
  total: number;
}

export interface ProductoPedido {
  idProducto: string;
  cantidad: number;
  precioUnitario: number;
  subtotal: number;
}

export interface Ubicacion {
  latitud: number | string;
  longitud: number | string;
  descripcion?: string;
  timestamp?: string;
}

export interface VehiculoConConductor {
  idVehiculo: string;
  placa: string;
  marca: string;
  modelo: string;
  capacidad: number;
  estado: string;
  conductor?: {
    id: string;
    nombre: string;
    email: string;
    telefono: string;
    licencia: string;
  };
  ubicacion?: Ubicacion;
}

export interface Planta {
  idPlanta: string;
  nombre: string;
  baseUrl: string;
}

export enum EstadoPedido {
  PENDIENTE = "PENDIENTE",
  EN_PROCESO = "EN_PROCESO",
  EN_CAMINO = "EN_CAMINO",
  ENTREGADO = "ENTREGADO",
  CANCELADO = "CANCELADO"
}

export enum EstadoObra {
  ACTIVA = "ACTIVA",
  COMPLETADA = "COMPLETADA",
  SUSPENDIDA = "SUSPENDIDA"
}

export interface AuthenticatedUser {
  uid: string;
  email: string;
  tipoUsuario: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistroRequest {
  email: string;
  password: string;
  tipoUsuario: string;
} 