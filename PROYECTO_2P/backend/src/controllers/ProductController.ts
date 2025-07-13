import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  getAllProducts = async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await this.productService.getAllProducts();
      res.json({
        success: true,
        data: products,
        message: 'Products retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID'
        });
        return;
      }

      const product = await this.productService.getProductById(id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      res.json({
        success: true,
        data: product,
        message: 'Product retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const { nombre, precio, stock } = req.body;

      // Validaciones
      if (!nombre || typeof nombre !== 'string' || nombre.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Product name is required and must be a non-empty string'
        });
        return;
      }

      if (!precio || typeof precio !== 'number' || precio <= 0) {
        res.status(400).json({
          success: false,
          message: 'Price is required and must be a positive number'
        });
        return;
      }

      if (stock === undefined || typeof stock !== 'number' || stock < 0) {
        res.status(400).json({
          success: false,
          message: 'Stock is required and must be a non-negative number'
        });
        return;
      }

      const product = await this.productService.createProduct({
        nombre: nombre.trim(),
        precio,
        stock
      });

      res.status(201).json({
        success: true,
        data: product,
        message: 'Product created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID'
        });
        return;
      }

      const { nombre, precio, stock } = req.body;

      // Validaciones opcionales
      if (nombre !== undefined && (typeof nombre !== 'string' || nombre.trim().length === 0)) {
        res.status(400).json({
          success: false,
          message: 'Product name must be a non-empty string'
        });
        return;
      }

      if (precio !== undefined && (typeof precio !== 'number' || precio <= 0)) {
        res.status(400).json({
          success: false,
          message: 'Price must be a positive number'
        });
        return;
      }

      if (stock !== undefined && (typeof stock !== 'number' || stock < 0)) {
        res.status(400).json({
          success: false,
          message: 'Stock must be a non-negative number'
        });
        return;
      }

      const updateData: any = {};
      if (nombre !== undefined) updateData.nombre = nombre.trim();
      if (precio !== undefined) updateData.precio = precio;
      if (stock !== undefined) updateData.stock = stock;

      const product = await this.productService.updateProduct(id, updateData);
      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      res.json({
        success: true,
        data: product,
        message: 'Product updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid product ID'
        });
        return;
      }

      const deleted = await this.productService.deleteProduct(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Product not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Product deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };
}
