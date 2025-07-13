// Types para el backend
export interface OrderDetailRow {
  id_detalle: number;
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
  subtotal?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateOrderDetailDTO {
  id_orden: number;
  id_producto: number;
  cantidad: number;
  precio_unitario: number;
}

export interface UpdateOrderDetailDTO {
  cantidad?: number;
  precio_unitario?: number;
}

export interface OrderDetailWithProductRow extends OrderDetailRow {
  producto_nombre: string;
  cliente?: string;
}
