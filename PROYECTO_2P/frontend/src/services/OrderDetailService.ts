import { OrderDetail, OrderDetailWithProduct, CreateOrderDetailRequest, UpdateOrderDetailRequest } from '../interfaces/types';
import { ApiResponse } from '../interfaces/types';
import { API_CONFIG, buildApiUrl, handleFetchError } from '../utils/apiConfig';

export class OrderDetailService {
  
  static async getAllOrderDetails(): Promise<OrderDetailWithProduct[]> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<OrderDetailWithProduct[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching order details:', error);
      throw error;
    }
  }

  static async getOrderDetailsByOrderId(orderId: number): Promise<OrderDetailWithProduct[]> {
    try {
      const url = `${buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS)}/order/${orderId}`;
      const response = await fetch(url, {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<OrderDetailWithProduct[]> = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('Error fetching order details by order:', error);
      throw error;
    }
  }

  static async getOrderDetailById(id: number): Promise<OrderDetail> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS, id), {
        method: 'GET',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<OrderDetail> = await response.json();
      if (!result.data) {
        throw new Error('Order detail not found');
      }
      return result.data;
    } catch (error) {
      console.error('Error fetching order detail:', error);
      throw error;
    }
  }

  static async createOrderDetail(orderDetail: CreateOrderDetailRequest): Promise<OrderDetail> {
    try {
      // Asegurar que los números se envíen como números
      const cleanedOrderDetail = {
        id_orden: Number(orderDetail.id_orden),
        id_producto: Number(orderDetail.id_producto),
        cantidad: Number(orderDetail.cantidad),
        precio_unitario: Number(orderDetail.precio_unitario)
      };

      console.log('Sending order detail data:', cleanedOrderDetail);

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS), {
        method: 'POST',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(cleanedOrderDetail),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<OrderDetail> = await response.json();
      if (!result.data) {
        throw new Error('Failed to create order detail');
      }
      return result.data;
    } catch (error) {
      console.error('Error creating order detail:', error);
      throw error;
    }
  }

  static async updateOrderDetail(id: number, orderDetail: UpdateOrderDetailRequest): Promise<OrderDetail> {
    try {
      // Limpiar y convertir números si están presentes
      const cleanedOrderDetail: any = {};
      if (orderDetail.cantidad !== undefined) {
        cleanedOrderDetail.cantidad = Number(orderDetail.cantidad);
      }
      if (orderDetail.precio_unitario !== undefined) {
        cleanedOrderDetail.precio_unitario = Number(orderDetail.precio_unitario);
      }

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS, id), {
        method: 'PUT',
        headers: API_CONFIG.HEADERS,
        body: JSON.stringify(cleanedOrderDetail),
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      const result: ApiResponse<OrderDetail> = await response.json();
      if (!result.data) {
        throw new Error('Failed to update order detail');
      }
      return result.data;
    } catch (error) {
      console.error('Error updating order detail:', error);
      throw error;
    }
  }

  static async deleteOrderDetail(id: number): Promise<boolean> {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.ORDER_DETAILS, id), {
        method: 'DELETE',
        headers: API_CONFIG.HEADERS,
      });

      if (!response.ok) {
        await handleFetchError(response);
      }

      return true;
    } catch (error) {
      console.error('Error deleting order detail:', error);
      throw error;
    }
  }
}
