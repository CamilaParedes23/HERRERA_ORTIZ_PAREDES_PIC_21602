// Interfaces para detalles de órdenes
export interface OrderDetail {
  id_detalle: number;
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
  created_at?: string;
  updated_at?: string;
}

export interface OrderDetailWithProduct extends OrderDetail {
  producto_nombre: string;
  cliente?: string;
}

export interface CreateOrderDetailRequest {
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

export interface UpdateOrderDetailRequest {
  cantidad?: number;
  precio_unitario?: number;
}

export interface OrderDetailFormData {
  id_orden: string;
  id_producto: string;
  cantidad: string;
  precio_unitario: string;
}
