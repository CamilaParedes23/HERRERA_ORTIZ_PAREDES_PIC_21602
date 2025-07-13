// Types para el backend
export interface OrderRow {
  id_orden: number;
  fecha: Date;
  cliente: string;
  total?: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateOrderDTO {
  cliente: string;
  fecha?: Date;
}

export interface UpdateOrderDTO {
  cliente?: string;
  fecha?: Date;
}
