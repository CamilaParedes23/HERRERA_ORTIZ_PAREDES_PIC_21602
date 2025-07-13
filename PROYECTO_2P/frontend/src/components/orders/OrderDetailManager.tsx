import React, { useState, useEffect } from 'react';
import { OrderDetail } from '../../interfaces/types';
import { Product } from '../../interfaces/Product';
import { Order } from '../../interfaces/Order';
import { OrderDetailService } from '../../services/OrderDetailService';
import { ProductService } from '../../services/ProductService';
import { OrderService } from '../../services/OrderService';
import OrderDetailForm from './OrderDetailForm';
import OrderDetailList from './OrderDetailList';

const OrderDetailManager: React.FC = () => {
  const [orderDetails, setOrderDetails] = useState<OrderDetail[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingDetail, setEditingDetail] = useState<OrderDetail | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const [detailsData, productsData, ordersData] = await Promise.all([
        OrderDetailService.getAllOrderDetails(),
        ProductService.getAllProducts(),
        OrderService.getAllOrders()
      ]);
      setOrderDetails(detailsData);
      setProducts(productsData);
      setOrders(ordersData);
    } catch (err) {
      setError('Error al cargar los datos');
      console.error('Error loading data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddDetail = () => {
    setEditingDetail(null);
    setShowForm(true);
  };

  const handleEditDetail = (detail: OrderDetail) => {
    setEditingDetail(detail);
    setShowForm(true);
  };

  const handleDeleteDetail = async (id: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este detalle de orden?')) {
      try {
        await OrderDetailService.deleteOrderDetail(id);
        await loadData(); // Recargar todos los datos para actualizar stock
      } catch (err) {
        setError('Error al eliminar el detalle de orden');
        console.error('Error deleting order detail:', err);
      }
    }
  };

  const handleFormSubmit = async (detailData: Omit<OrderDetail, 'id_detalle'>) => {
    try {
      setError(null);
      if (editingDetail) {
        const updateData = {
          cantidad: detailData.cantidad,
          precio_unitario: detailData.precio_unitario
        };
        await OrderDetailService.updateOrderDetail(editingDetail.id_detalle, updateData);
      } else {
        const createData = {
          id_orden: detailData.id_orden,
          id_producto: detailData.id_producto,
          cantidad: detailData.cantidad,
          precio_unitario: detailData.precio_unitario
        };
        await OrderDetailService.createOrderDetail(createData);
      }
      setShowForm(false);
      setEditingDetail(null);
      await loadData(); // Recargar todos los datos para actualizar stock
    } catch (err) {
      setError('Error al guardar el detalle de orden');
      console.error('Error saving order detail:', err);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingDetail(null);
  };

  // Enriquecer los detalles con información de productos y órdenes
  const enrichedDetails = orderDetails.map(detail => {
    const product = products.find(p => p.id_producto === detail.id_producto);
    const order = orders.find(o => o.id_orden === detail.id_orden);
    return {
      ...detail,
      producto_nombre: product?.nombre || 'Producto no encontrado',
      orden_cliente: order?.cliente || 'Orden no encontrada',
      orden_fecha: order?.fecha || ''
    };
  });

  if (loading) {
    return (
      <div className="order-detail-manager">
        <div className="loading">Cargando detalles de órdenes...</div>
      </div>
    );
  }

  return (
    <div className="order-detail-manager">
      <div className="detail-header">
        <h2>Gestión de Detalles de Órdenes</h2>
        <button 
          className="btn btn-primary"
          onClick={handleAddDetail}
          disabled={orders.length === 0 || products.length === 0}
        >
          Nuevo Detalle
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {orders.length === 0 && (
        <div className="warning-message">
          <strong>Advertencia:</strong> No hay órdenes disponibles. Crea una orden primero.
        </div>
      )}

      {products.length === 0 && (
        <div className="warning-message">
          <strong>Advertencia:</strong> No hay productos disponibles. Crea productos primero.
        </div>
      )}

      {showForm ? (
        <OrderDetailForm
          detail={editingDetail}
          products={products}
          orders={orders}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <OrderDetailList
          details={enrichedDetails}
          onEdit={handleEditDetail}
          onDelete={handleDeleteDetail}
        />
      )}
    </div>
  );
};

export default OrderDetailManager;
