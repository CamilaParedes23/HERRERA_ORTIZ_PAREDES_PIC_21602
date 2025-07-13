import { Request, Response } from 'express';
import { OrderService } from '../services/OrderService';

export class OrderController {
  private orderService: OrderService;

  constructor() {
    this.orderService = new OrderService();
  }

  getAllOrders = async (req: Request, res: Response): Promise<void> => {
    try {
      const orders = await this.orderService.getAllOrders();
      res.json({
        success: true,
        data: orders,
        message: 'Orders retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  getOrderById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID'
        });
        return;
      }

      const order = await this.orderService.getOrderById(id);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.json({
        success: true,
        data: order,
        message: 'Order retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const { cliente, fecha } = req.body;

      // Validaciones
      if (!cliente || typeof cliente !== 'string' || cliente.trim().length === 0) {
        res.status(400).json({
          success: false,
          message: 'Client name is required and must be a non-empty string'
        });
        return;
      }

      const orderData: any = {
        cliente: cliente.trim()
      };

      if (fecha) {
        const fechaDate = new Date(fecha);
        if (isNaN(fechaDate.getTime())) {
          res.status(400).json({
            success: false,
            message: 'Invalid date format'
          });
          return;
        }
        orderData.fecha = fechaDate;
      }

      const order = await this.orderService.createOrder(orderData);

      res.status(201).json({
        success: true,
        data: order,
        message: 'Order created successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  updateOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID'
        });
        return;
      }

      const { cliente, fecha } = req.body;

      // Validaciones opcionales
      if (cliente !== undefined && (typeof cliente !== 'string' || cliente.trim().length === 0)) {
        res.status(400).json({
          success: false,
          message: 'Client name must be a non-empty string'
        });
        return;
      }

      const updateData: any = {};
      if (cliente !== undefined) updateData.cliente = cliente.trim();
      
      if (fecha !== undefined) {
        const fechaDate = new Date(fecha);
        if (isNaN(fechaDate.getTime())) {
          res.status(400).json({
            success: false,
            message: 'Invalid date format'
          });
          return;
        }
        updateData.fecha = fechaDate;
      }

      const order = await this.orderService.updateOrder(id, updateData);
      if (!order) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.json({
        success: true,
        data: order,
        message: 'Order updated successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  deleteOrder = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID'
        });
        return;
      }

      const deleted = await this.orderService.deleteOrder(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Order not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Order deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };
}
