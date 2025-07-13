import React, { useState, useEffect } from 'react';
import { Product, ProductFormData, CreateProductRequest, UpdateProductRequest } from '../../interfaces/types';
import { ProductService } from '../../services/ProductService';

interface ProductFormProps {
  product?: Product | null;
  onProductCreated: (product: Product) => void;
  onProductUpdated: (product: Product) => void;
  onCancel: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({
  product,
  onProductCreated,
  onProductUpdated,
  onCancel
}) => {
  const [formData, setFormData] = useState<ProductFormData>({
    nombre: '',
    precio: '',
    stock: ''
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (product) {
      setFormData({
        nombre: product.nombre,
        precio: product.precio.toString(),
        stock: product.stock.toString()
      });
    }
  }, [product]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      setError('El nombre del producto es requerido');
      return false;
    }
    
    const precio = parseFloat(formData.precio);
    if (isNaN(precio) || precio <= 0) {
      setError('El precio debe ser un número mayor a 0');
      return false;
    }
    
    const stock = parseInt(formData.stock);
    if (isNaN(stock) || stock < 0) {
      setError('El stock debe ser un número mayor o igual a 0');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    
    try {
      const productData = {
        nombre: formData.nombre.trim(),
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };

      if (product) {
        // Actualizar producto existente
        const updatedProduct = await ProductService.updateProduct(product.id_producto, productData as UpdateProductRequest);
        onProductUpdated(updatedProduct);
      } else {
        // Crear nuevo producto
        const newProduct = await ProductService.createProduct(productData as CreateProductRequest);
        onProductCreated(newProduct);
      }

      // Limpiar formulario
      setFormData({
        nombre: '',
        precio: '',
        stock: ''
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar el producto');
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setFormData({
      nombre: '',
      precio: '',
      stock: ''
    });
    setError('');
    onCancel();
  };

  return (
    <div className="product-form">
      <h3>{product ? 'Editar Producto' : 'Agregar Nuevo Producto'}</h3>
      
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombre">Nombre del Producto:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            disabled={loading}
            placeholder="Ingresa el nombre del producto"
          />
        </div>

        <div className="form-group">
          <label htmlFor="precio">Precio:</label>
          <input
            type="number"
            id="precio"
            name="precio"
            value={formData.precio}
            onChange={handleInputChange}
            step="0.01"
            min="0"
            required
            disabled={loading}
            placeholder="0.00"
          />
        </div>

        <div className="form-group">
          <label htmlFor="stock">Stock:</label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            required
            disabled={loading}
            placeholder="0"
          />
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Procesando...' : (product ? 'Actualizar' : 'Agregar')}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
