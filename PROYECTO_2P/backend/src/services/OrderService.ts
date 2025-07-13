import { OrderModel } from '../models/OrderModel';
import { OrderRow, CreateOrderDTO, UpdateOrderDTO } from '../interfaces/Order';

export class OrderService {
  async getAllOrders(): Promise<OrderRow[]> {
    try {
      return await OrderModel.findAll();
    } catch (error) {
      throw new Error(`Error fetching orders: ${error}`);
    }
  }

  async getOrderById(id: number): Promise<OrderRow | null> {
    try {
      return await OrderModel.findById(id);
    } catch (error) {
      throw new Error(`Error fetching order: ${error}`);
    }
  }

  async createOrder(orderData: CreateOrderDTO): Promise<OrderRow> {
    try {
      // Validaciones
      if (!orderData.cliente || orderData.cliente.trim().length === 0) {
        throw new Error('Client name is required');
      }

      return await OrderModel.create(orderData);
    } catch (error) {
      throw new Error(`Error creating order: ${error}`);
    }
  }

  async updateOrder(id: number, orderData: UpdateOrderDTO): Promise<OrderRow | null> {
    try {
      // Validaciones
      if (orderData.cliente !== undefined && orderData.cliente.trim().length === 0) {
        throw new Error('Client name cannot be empty');
      }

      return await OrderModel.update(id, orderData);
    } catch (error) {
      throw new Error(`Error updating order: ${error}`);
    }
  }

  async deleteOrder(id: number): Promise<boolean> {
    try {
      return await OrderModel.delete(id);
    } catch (error) {
      throw new Error(`Error deleting order: ${error}`);
    }
  }
}
