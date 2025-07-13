import React from 'react';
import { OrderDetail } from '../../interfaces/types';

interface EnrichedOrderDetail extends OrderDetail {
  producto_nombre?: string;
  orden_cliente?: string;
  orden_fecha?: string;
}

interface OrderDetailListProps {
  details: EnrichedOrderDetail[];
  onEdit: (detail: OrderDetail) => void;
  onDelete: (id: number) => void;
}

const OrderDetailList: React.FC<OrderDetailListProps> = ({ details, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const getTotal = (detail: OrderDetail) => {
    return detail.cantidad * detail.precio_unitario;
  };

  const getTotalAmount = () => {
    return details.reduce((sum, detail) => sum + getTotal(detail), 0);
  };

  if (details.length === 0) {
    return (
      <div className="order-detail-list">
        <div className="empty-state">
          <h3>No hay detalles de órdenes disponibles</h3>
          <p>Haz clic en "Nuevo Detalle" para agregar productos a una orden.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-list">
      <h3>Lista de Detalles de Órdenes ({details.length})</h3>
      
      <div className="table-container">
        <table className="detail-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Orden</th>
              <th>Cliente</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unit.</th>
              <th>Total</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr key={detail.id_detalle}>
                <td>
                  <span className="detail-id">#{detail.id_detalle}</span>
                </td>
                <td>
                  <span className="order-id">#{detail.id_orden}</span>
                </td>
                <td>
                  <div className="client-info">
                    <span className="client-name">{detail.orden_cliente}</span>
                  </div>
                </td>
                <td>
                  <div className="product-info">
                    <span className="product-name">{detail.producto_nombre}</span>
                  </div>
                </td>
                <td>
                  <span className="quantity">{detail.cantidad}</span>
                </td>
                <td>
                  <span className="unit-price">{formatCurrency(detail.precio_unitario)}</span>
                </td>
                <td>
                  <span className="total-price">{formatCurrency(getTotal(detail))}</span>
                </td>
                <td>
                  <span className="order-date">{formatDate(detail.orden_fecha || '')}</span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-edit"
                      onClick={() => onEdit(detail)}
                      title="Editar detalle"
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => onDelete(detail.id_detalle)}
                      title="Eliminar detalle"
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

      <div className="detail-summary">
        <div className="summary-item">
          <span className="summary-label">Total de detalles:</span>
          <span className="summary-value">{details.length}</span>
        </div>
        <div className="summary-item">
          <span className="summary-label">Cantidad total:</span>
          <span className="summary-value">
            {details.reduce((sum, detail) => sum + detail.cantidad, 0)}
          </span>
        </div>
        <div className="summary-item total-amount">
          <span className="summary-label">Monto total:</span>
          <span className="summary-value">{formatCurrency(getTotalAmount())}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailList;
