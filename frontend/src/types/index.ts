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
  nombreComercial: string;
  descripcion: string;
  precioBase: number;
}

export interface Vehiculo {
  idVehiculo: string;
  placa: string;
  tipo: string;
  capacidadM3: number;
  activo: boolean;
  ubicacionActual: Ubicacion;
  idConductor: string;
}

export interface Obra {
  idObra: string;
  nombreObra: string;
  direccion: string;
  municipio: string;
  ubicacion: Ubicacion;
  estado: string;
  fechaInicio: string;
  idCliente: string;
}

export interface Pedido {
  idPedido: string;
  idCliente: string;
  idObra: string;
  idVehiculo: string;
  idConductor: string;
  productos: ProductoPedido[];
  fechaEntrega: string;
  horaEntrega: string;
  estado: EstadoPedido;
  ubicacionActual: Ubicacion;
}

export interface ProductoPedido {
  idProducto: string;
  cantidadM3: number;
  precioUnitario: number;
  observaciones: string;
}

export interface Ubicacion {
  latitud: number | string;
  longitud: number | string;
  descripcion?: string;
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