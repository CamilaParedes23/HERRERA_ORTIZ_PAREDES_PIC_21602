// Interfaces para el frontend
export interface Product {
  id_producto: number;
  nombre: string;
  precio: number;
  stock: number;
  created_at?: string;
  updated_at?: string;
}

export interface CreateProductRequest {
  nombre: string;
  precio: number;
  stock: number;
}

export interface UpdateProductRequest {
  nombre?: string;
  precio?: number;
  stock?: number;
}

export interface ProductFormData {
  nombre: string;
  precio: string;
  stock: string;
}
