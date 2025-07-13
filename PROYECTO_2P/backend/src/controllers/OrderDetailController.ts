import { Request, Response } from 'express';
import { OrderDetailService } from '../services/OrderDetailService';

export class OrderDetailController {
  private orderDetailService: OrderDetailService;

  constructor() {
    this.orderDetailService = new OrderDetailService();
  }

  getAllOrderDetails = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderDetails = await this.orderDetailService.getAllOrderDetails();
      res.json({
        success: true,
        data: orderDetails,
        message: 'Order details retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  getOrderDetailsByOrderId = async (req: Request, res: Response): Promise<void> => {
    try {
      const orderId = parseInt(req.params.orderId);
      if (isNaN(orderId)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order ID'
        });
        return;
      }

      const orderDetails = await this.orderDetailService.getOrderDetailsByOrderId(orderId);
      res.json({
        success: true,
        data: orderDetails,
        message: 'Order details retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  getOrderDetailById = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order detail ID'
        });
        return;
      }

      const orderDetail = await this.orderDetailService.getOrderDetailById(id);
      if (!orderDetail) {
        res.status(404).json({
          success: false,
          message: 'Order detail not found'
        });
        return;
      }

      res.json({
        success: true,
        data: orderDetail,
        message: 'Order detail retrieved successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };

  createOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id_orden, id_producto, cantidad, precio_unitario } = req.body;

      // Validaciones
      if (!id_orden || typeof id_orden !== 'number' || id_orden <= 0) {
        res.status(400).json({
          success: false,
          message: 'Order ID is required and must be a positive number'
        });
        return;
      }

      if (!id_producto || typeof id_producto !== 'number' || id_producto <= 0) {
        res.status(400).json({
          success: false,
          message: 'Product ID is required and must be a positive number'
        });
        return;
      }

      if (!cantidad || typeof cantidad !== 'number' || cantidad <= 0) {
        res.status(400).json({
          success: false,
          message: 'Quantity is required and must be a positive number'
        });
        return;
      }

      if (!precio_unitario || typeof precio_unitario !== 'number' || precio_unitario <= 0) {
        res.status(400).json({
          success: false,
          message: 'Unit price is required and must be a positive number'
        });
        return;
      }

      const orderDetail = await this.orderDetailService.createOrderDetail({
        id_orden,
        id_producto,
        cantidad,
        precio_unitario
      });

      res.status(201).json({
        success: true,
        data: orderDetail,
        message: 'Order detail created successfully'
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('Order not found')) {
          res.status(404).json({
            success: false,
            message: 'Order not found'
          });
        } else if (error.message.includes('Product not found')) {
          res.status(404).json({
            success: false,
            message: 'Product not found'
          });
        } else if (error.message.includes('Insufficient stock')) {
          res.status(400).json({
            success: false,
            message: 'Insufficient stock for this product'
          });
        } else {
          res.status(500).json({
            success: false,
            message: error.message
          });
        }
      } else {
        res.status(500).json({
          success: false,
          message: 'Unknown error occurred'
        });
      }
    }
  };

  updateOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order detail ID'
        });
        return;
      }

      const { cantidad, precio_unitario } = req.body;

      // Validaciones opcionales
      if (cantidad !== undefined && (typeof cantidad !== 'number' || cantidad <= 0)) {
        res.status(400).json({
          success: false,
          message: 'Quantity must be a positive number'
        });
        return;
      }

      if (precio_unitario !== undefined && (typeof precio_unitario !== 'number' || precio_unitario <= 0)) {
        res.status(400).json({
          success: false,
          message: 'Unit price must be a positive number'
        });
        return;
      }

      const updateData: any = {};
      if (cantidad !== undefined) updateData.cantidad = cantidad;
      if (precio_unitario !== undefined) updateData.precio_unitario = precio_unitario;

      const orderDetail = await this.orderDetailService.updateOrderDetail(id, updateData);
      if (!orderDetail) {
        res.status(404).json({
          success: false,
          message: 'Order detail not found'
        });
        return;
      }

      res.json({
        success: true,
        data: orderDetail,
        message: 'Order detail updated successfully'
      });
    } catch (error) {
      if (error instanceof Error && error.message.includes('Insufficient stock')) {
        res.status(400).json({
          success: false,
          message: 'Insufficient stock for this quantity'
        });
      } else {
        res.status(500).json({
          success: false,
          message: error instanceof Error ? error.message : 'Unknown error occurred'
        });
      }
    }
  };

  deleteOrderDetail = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        res.status(400).json({
          success: false,
          message: 'Invalid order detail ID'
        });
        return;
      }

      const deleted = await this.orderDetailService.deleteOrderDetail(id);
      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Order detail not found'
        });
        return;
      }

      res.json({
        success: true,
        message: 'Order detail deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  };
}
