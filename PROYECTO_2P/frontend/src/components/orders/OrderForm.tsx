import React, { useState, useEffect } from 'react';
import { Order } from '../../interfaces/types';

interface OrderFormProps {
  order: Order | null;
  onSubmit: (order: Omit<Order, 'id_orden'>) => void;
  onCancel: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ order, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    fecha: '',
    cliente: ''
  });
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  useEffect(() => {
    if (order) {
      setFormData({
        fecha: order.fecha,
        cliente: order.cliente
      });
    } else {
      // Para nueva orden, usar fecha actual
      const today = new Date().toISOString().split('T')[0];
      setFormData({
        fecha: today,
        cliente: ''
      });
    }
  }, [order]);

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};

    if (!formData.cliente.trim()) {
      newErrors.cliente = 'El nombre del cliente es requerido';
    } else if (formData.cliente.trim().length < 2) {
      newErrors.cliente = 'El nombre del cliente debe tener al menos 2 caracteres';
    }

    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es requerida';
    } else {
      // Validar que la fecha no sea futura
      const selectedDate = new Date(formData.fecha);
      const today = new Date();
      today.setHours(23, 59, 59, 999); // Permitir hasta el final del día actual
      
      if (selectedDate > today) {
        newErrors.fecha = 'No se pueden seleccionar fechas futuras';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

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
        fecha: formData.fecha,
        cliente: formData.cliente.trim()
      });
    }
  };

  return (
    <div className="order-form-container">
      <div className="order-form">
        <h3>{order ? 'Editar Orden' : 'Nueva Orden'}</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="cliente">Cliente *</label>
            <input
              type="text"
              id="cliente"
              name="cliente"
              value={formData.cliente}
              onChange={handleChange}
              className={errors.cliente ? 'error' : ''}
              placeholder="Ingrese el nombre del cliente"
              maxLength={255}
            />
            {errors.cliente && <span className="error-text">{errors.cliente}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="fecha">Fecha *</label>
            <input
              type="date"
              id="fecha"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              className={errors.fecha ? 'error' : ''}
              max={new Date().toISOString().split('T')[0]}
            />
            {errors.fecha && <span className="date-error">{errors.fecha}</span>}
            <span className="help-text">Solo se permiten fechas pasadas o del día actual</span>
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {order ? 'Actualizar' : 'Crear'} Orden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OrderForm;
