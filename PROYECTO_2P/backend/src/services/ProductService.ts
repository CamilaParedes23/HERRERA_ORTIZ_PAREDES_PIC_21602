import { ProductModel } from '../models/ProductModel';
import { ProductRow, CreateProductDTO, UpdateProductDTO } from '../interfaces/Product';

export class ProductService {
  async getAllProducts(): Promise<ProductRow[]> {
    try {
      return await ProductModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching products: ${error}`);
    }
  }

  async getProductById(id: number): Promise<ProductRow | null> {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching product: ${error}`);
    }
  }

  async createProduct(productData: CreateProductDTO): Promise<ProductRow> {
    try {
      // Validaciones
      if (!productData.nombre || productData.nombre.trim().length === 0) {
        throw new Error('Product name is required');
      }
      if (productData.precio <= 0) {
        throw new Error('Price must be greater than 0');
      }
      if (productData.stock < 0) {
        throw new Error('Stock cannot be negative');
      }

      return await ProductModel.create(productData);
    } catch (error) {
      throw new Error(`Error creating product: ${error}`);
    }
  }

  async updateProduct(id: number, productData: UpdateProductDTO): Promise<ProductRow | null> {
    try {
      // Validaciones
      if (productData.precio !== undefined && productData.precio <= 0) {
        throw new Error('Price must be greater than 0');
      }
      if (productData.stock !== undefined && productData.stock < 0) {
        throw new Error('Stock cannot be negative');
      }
      if (productData.nombre !== undefined && productData.nombre.trim().length === 0) {
        throw new Error('Product name cannot be empty');
      }

      return await ProductModel.update(id, productData);
    } catch (error) {
      throw new Error(`Error updating product: ${error}`);
    }
  }

  async deleteProduct(id: number): Promise<boolean> {
    try {
      return await ProductModel.delete(id);
    } catch (error) {
      throw new Error(`Error deleting product: ${error}`);
    }
  }
}
