import React from 'react';
import { Order } from '../../interfaces/types';

interface OrderListProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: number) => void;
}

const OrderList: React.FC<OrderListProps> = ({ orders, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (orders.length === 0) {
    return (
      <div className="order-list">
        <div className="empty-state">
          <h3>No hay órdenes disponibles</h3>
          <p>Haz clic en "Nueva Orden" para crear la primera orden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-list">
      <h3>Lista de Órdenes ({orders.length})</h3>
      
      <div className="table-container">
        <table className="order-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id_orden}>
                <td>
                  <span className="order-id">#{order.id_orden}</span>
                </td>
                <td>
                  <div className="client-info">
                    <span className="client-name">{order.cliente}</span>
                  </div>
                </td>
                <td>
                  <span className="order-date">{formatDate(order.fecha)}</span>
                </td>
                <td>
                  <span className="created-date">
                    {order.created_at 
                      ? new Date(order.created_at).toLocaleDateString('es-ES')
                      : 'N/A'
                    }
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => onEdit(order)}
                      title="Editar orden"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(order.id_orden)}
                      title="Eliminar orden"
                    >
                      🗑️
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="order-summary">
        <div className="summary-item">
          <span className="summary-label">Total de órdenes:</span>
          <span className="summary-value">{orders.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Sistema:</span>
          <span className="summary-value">Tiempo real ⚡</span>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
