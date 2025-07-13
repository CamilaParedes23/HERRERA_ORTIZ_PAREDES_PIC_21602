import { OrderDetailModel } from '../models/OrderDetailModel';
import { OrderDetailRow, CreateOrderDetailDTO, UpdateOrderDetailDTO, OrderDetailWithProductRow } from '../interfaces/OrderDetail';

export class OrderDetailService {
  async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetailWithProductRow[]> {
    try {
      return await OrderDetailModel.findByOrderId(orderId);
    } catch (error) {
      throw new Error(`Error fetching order details: ${error}`);
    }
  }

  async getAllOrderDetails(): Promise<OrderDetailWithProductRow[]> {
    try {
      return await OrderDetailModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching all order details: ${error}`);
    }
  }

  async getOrderDetailById(id: number): Promise<OrderDetailWithProductRow | null> {
    try {
      return await OrderDetailModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching order detail: ${error}`);
    }
  }

  async createOrderDetail(detailData: CreateOrderDetailDTO): Promise<OrderDetailRow> {
    try {
      // Validaciones
      if (detailData.cantidad <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      if (detailData.precio_unitario <= 0) {
        throw new Error('Unit price must be greater than 0');
      }

      return await OrderDetailModel.create(detailData);
    } catch (error) {
      throw new Error(`Error creating order detail: ${error}`);
    }
  }

  async updateOrderDetail(id: number, detailData: UpdateOrderDetailDTO): Promise<OrderDetailRow | null> {
    try {
      // Validaciones
      if (detailData.cantidad !== undefined && detailData.cantidad <= 0) {
        throw new Error('Quantity must be greater than 0');
      }
      if (detailData.precio_unitario !== undefined && detailData.precio_unitario <= 0) {
        throw new Error('Unit price must be greater than 0');
      }

      return await OrderDetailModel.update(id, detailData);
    } catch (error) {
      throw new Error(`Error updating order detail: ${error}`);
    }
  }

  async deleteOrderDetail(id: number): Promise<boolean> {
    try {
      return await OrderDetailModel.delete(id);
    } catch (error) {
      throw new Error(`Error deleting order detail: ${error}`);
    }
  }
}
