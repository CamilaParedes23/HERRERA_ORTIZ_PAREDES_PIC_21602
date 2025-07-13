import React, { useState, useEffect } from 'react';
import { OrderDetail, Product } from '../../interfaces/types';
import { Order } from '../../interfaces/Order';

interface OrderDetailFormProps {
  detail: OrderDetail | null;
  products: Product[];
  orders: Order[];
  onSubmit: (detail: Omit<OrderDetail, 'id_detalle'>) => void;
  onCancel: () => void;
}

const OrderDetailForm: React.FC<OrderDetailFormProps> = ({ 
  detail, 
  products, 
  orders, 
  onSubmit, 
  onCancel 
}) => {
  const [formData, setFormData] = useState({
    id_orden: 0,
    id_producto: 0,
    cantidad: 1,
    precio_unitario: 0
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    if (detail) {
      setFormData({
        id_orden: detail.id_orden,
        id_producto: detail.id_producto,
        cantidad: detail.cantidad,
        precio_unitario: detail.precio_unitario
      });
      const product = products.find(p => p.id_producto === detail.id_producto);
      setSelectedProduct(product || null);
    } else {
      setFormData({
        id_orden: orders.length > 0 ? orders[0].id_orden : 0,
        id_producto: 0,
        cantidad: 1,
        precio_unitario: 0
      });
      setSelectedProduct(null);
    }
  }, [detail, products, orders]);

  useEffect(() => {
    // Actualizar precio unitario automáticamente cuando se selecciona un producto
    if (selectedProduct) {
      setFormData(prev => ({
        ...prev,
        precio_unitario: selectedProduct.precio
      }));
    }
  }, [selectedProduct]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (formData.id_orden === 0) {
      newErrors.id_orden = 'Debe seleccionar una orden';
    }

    if (formData.id_producto === 0) {
      newErrors.id_producto = 'Debe seleccionar un producto';
    }

    if (formData.cantidad <= 0) {
      newErrors.cantidad = 'La cantidad debe ser mayor a 0';
    }

    if (selectedProduct && formData.cantidad > selectedProduct.stock) {
      newErrors.cantidad = `Stock insuficiente. Disponible: ${selectedProduct.stock}`;
    }

    if (formData.precio_unitario <= 0) {
      newErrors.precio_unitario = 'El precio unitario debe ser mayor a 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name === 'id_producto') {
      const productId = parseInt(value);
      const product = products.find(p => p.id_producto === productId);
      setSelectedProduct(product || null);
      setFormData(prev => ({
        ...prev,
        [name]: productId,
        precio_unitario: product ? product.precio : 0
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'cantidad' || name === 'precio_unitario' || name === 'id_orden' 
          ? parseFloat(value) || 0 
          : value
      }));
    }

    // Limpiar error del campo que se está editando
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        id_orden: formData.id_orden,
        id_producto: formData.id_producto,
        cantidad: formData.cantidad,
        precio_unitario: formData.precio_unitario
      });
    }
  };

  const getTotal = () => {
    return (formData.cantidad * formData.precio_unitario).toFixed(2);
  };

  return (
    <div className="order-detail-form-container">
      <div className="order-detail-form">
        <h3>{detail ? 'Editar Detalle de Orden' : 'Nuevo Detalle de Orden'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="id_orden">Orden *</label>
            <select
              id="id_orden"
              name="id_orden"
              value={formData.id_orden}
              onChange={handleChange}
              className={errors.id_orden ? 'error' : ''}
            >
              <option value={0}>Seleccione una orden</option>
              {orders.map(order => (
                <option key={order.id_orden} value={order.id_orden}>
                  #{order.id_orden} - {order.cliente} ({new Date(order.fecha).toLocaleDateString()})
                </option>
              ))}
            </select>
            {errors.id_orden && <span className="error-text">{errors.id_orden}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="id_producto">Producto *</label>
            <select
              id="id_producto"
              name="id_producto"
              value={formData.id_producto}
              onChange={handleChange}
              className={errors.id_producto ? 'error' : ''}
            >
              <option value={0}>Seleccione un producto</option>
              {products.map(product => (
                <option key={product.id_producto} value={product.id_producto}>
                  {product.nombre} - ${product.precio} (Stock: {product.stock})
                </option>
              ))}
            </select>
            {errors.id_producto && <span className="error-text">{errors.id_producto}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="cantidad">Cantidad *</label>
            <input
              type="number"
              id="cantidad"
              name="cantidad"
              value={formData.cantidad}
              onChange={handleChange}
              className={errors.cantidad ? 'error' : ''}
              min="1"
              max={selectedProduct ? selectedProduct.stock : undefined}
            />
            {errors.cantidad && <span className="error-text">{errors.cantidad}</span>}
            {selectedProduct && (
              <span className="help-text">Stock disponible: {selectedProduct.stock}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="precio_unitario">Precio Unitario * (automático)</label>
            <input
              type="number"
              id="precio_unitario"
              name="precio_unitario"
              value={formData.precio_unitario}
              className="readonly-input"
              readOnly
              min="0.01"
              step="0.01"
            />
            <span className="help-text">
              El precio se toma automáticamente del producto seleccionado
            </span>
          </div>

          <div className="total-section">
            <div className="total-display">
              <strong>Total: ${getTotal()}</strong>
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {detail ? 'Actualizar' : 'Crear'} Detalle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderDetailForm;
