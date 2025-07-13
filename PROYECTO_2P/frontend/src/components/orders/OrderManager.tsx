import React, { useState, useEffect } from 'react';
import { Order } from '../../interfaces/types';
import { OrderService } from '../../services/OrderService';
import { useStats } from '../../contexts/StatsContext';
import OrderForm from './OrderForm';
import OrderList from './OrderList';

const OrderManager: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { stats, refreshStats } = useStats();

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await OrderService.getAllOrders();
      setOrders(data);
    } catch (err) {
      setError('Error al cargar las órdenes');
      console.error('Error loading orders:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowForm(true);
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder(order);
    setShowForm(true);
  };

  const handleDeleteOrder = async (id: number) => {
    const confirmed = window.confirm('⚠️ ¿Estás seguro de que quieres eliminar esta orden?\n\nEsta acción no se puede deshacer.');
    if (confirmed) {
      try {
        setIsProcessing(true);
        setError(null);
        await OrderService.deleteOrder(id);
        await loadOrders();
        // Actualizar estadísticas después de eliminar orden
        await refreshStats();
        setSuccessMessage('🗑️ Orden eliminada con éxito');
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('❌ Error al eliminar la orden. Por favor, intenta nuevamente.');
        console.error('Error deleting order:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleFormSubmit = async (orderData: Omit<Order, 'id_orden'>) => {
    try {
      setIsProcessing(true);
      setError(null);
      if (editingOrder) {
        await OrderService.updateOrder(editingOrder.id_orden, orderData);
        setSuccessMessage('✅ Orden actualizada con éxito');
      } else {
        await OrderService.createOrder(orderData);
        setSuccessMessage('✅ Orden creada con éxito');
      }
      await loadOrders();
      // Actualizar estadísticas después de crear/actualizar orden
      await refreshStats();
      setShowForm(false);
      setEditingOrder(null);
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err) {
      setError('❌ Error al guardar la orden. Por favor, intenta nuevamente.');
      console.error('Error saving order:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingOrder(null);
  };

  if (loading) {
    return (
      <div className="order-manager">
        <div className="loading">
          <div className="loading-spinner"></div>
          Cargando órdenes...
        </div>
      </div>
    );
  }

  return (
    <div className="order-manager">
      <div className="order-header">
        <h2>Gestión de Órdenes</h2>
        <button 
          className={`btn btn-primary ${isProcessing ? 'loading' : ''}`}
          onClick={handleAddOrder}
          disabled={showForm || isProcessing}
        >
          {isProcessing && <div className="loading-spinner"></div>}
          {showForm ? 'Formulario Activo' : '+ Nueva Orden'}
        </button>
      </div>

      {/* Estadísticas en tiempo real */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.loading ? '...' : stats.totalOrders}</h3>
            <p>Órdenes totales</p>
          </div>
        </div>
        <div className="stat-card highlight">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>RT</h3>
            <p>Sistema en tiempo real</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h3>{stats.loading ? '...' : stats.totalProducts}</h3>
            <p>Productos disponibles</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={() => setError(null)} 
            className="btn-close"
            title="Cerrar mensaje"
          >
            ×
          </button>
        </div>
      )}

      {successMessage && (
        <div className="success-message">
          {successMessage}
          <button 
            onClick={() => setSuccessMessage('')} 
            className="btn-close"
            title="Cerrar mensaje"
          >
            ×
          </button>
        </div>
      )}

      {showForm ? (
        <OrderForm
          order={editingOrder}
          onSubmit={handleFormSubmit}
          onCancel={handleFormCancel}
        />
      ) : (
        <OrderList
          orders={orders}
          onEdit={handleEditOrder}
          onDelete={handleDeleteOrder}
        />
      )}
    </div>
  );
};

export default OrderManager;
