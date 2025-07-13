// Types para el backend
export interface ProductRow {
  id_producto: number;
  nombre: string;
  precio: number;
  stock: number;
  created_at?: Date;
  updated_at?: Date;
}

export interface CreateProductDTO {
  nombre: string;
  precio: number;
  stock: number;
}

export interface UpdateProductDTO {
  nombre?: string;
  precio?: number;
  stock?: number;
}
