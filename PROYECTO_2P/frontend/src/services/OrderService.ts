import { Order, CreateOrderRequest, UpdateOrderRequest } from '../interfaces/types';
import { ApiResponse } from '../interfaces/types';
import { API_CONFIG, buildApiUrl, handleFetchError } from '../utils/apiConfig';

export class OrderService {
  
  static async getAllOrders(): Promise<Order[]> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Order[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      throw error;
    }
  }

  static async getOrderById(id: number): Promise<Order> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS, id), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Order> = await response.json();
      if (!result.data) {
        throw new Error('Order not found');
      }
      return result.data;
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }

  static async createOrder(orderData: CreateOrderRequest): Promise<Order> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS), {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Order> = await response.json();
      if (!result.data) {
        throw new Error('Failed to create order');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  static async updateOrder(id: number, orderData: UpdateOrderRequest): Promise<Order> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS, id), {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<Order> = await response.json();
      if (!result.data) {
        throw new Error('Failed to update order');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating order:', error);
      throw error;
    }
  }

  static async deleteOrder(id: number): Promise<void> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDERS, id), {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }
    } catch (error) {
      console.error('Error deleting order:', error);
      throw error;
    }
  }
}
