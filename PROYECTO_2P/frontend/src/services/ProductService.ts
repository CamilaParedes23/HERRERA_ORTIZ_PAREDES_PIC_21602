import { Product, CreateProductRequest, UpdateProductRequest } from '../interfaces/types';
import { ApiResponse } from '../interfaces/types';
import { API_CONFIG, buildApiUrl, handleFetchError } from '../utils/apiConfig';

export class ProductService {
  
  static async getAllProducts(): Promise<Product[]> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Product[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  static async getProductById(id: number): Promise<Product> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS, id), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Product> = await response.json();
      if (!result.data) {
        throw new Error('Product not found');
      }
      return result.data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  static async createProduct(productData: CreateProductRequest): Promise<Product> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS), {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Product> = await response.json();
      if (!result.data) {
        throw new Error('Failed to create product');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  static async updateProduct(id: number, productData: UpdateProductRequest): Promise<Product> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS, id), {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Product> = await response.json();
      if (!result.data) {
        throw new Error('Failed to update product');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }

  static async deleteProduct(id: number): Promise<void> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.PRODUCTS, id), {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  }
}
