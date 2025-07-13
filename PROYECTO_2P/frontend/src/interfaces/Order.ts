// Interfaces para órdenes
export interface Order {
  id_orden: number;
  fecha: string;
  cliente: string;
  total?: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateOrderRequest {
  cliente: string;
  fecha?: string;
}

export interface UpdateOrderRequest {
  cliente?: string;
  fecha?: string;
}

export interface OrderFormData {
  cliente: string;
  fecha: string;
}
