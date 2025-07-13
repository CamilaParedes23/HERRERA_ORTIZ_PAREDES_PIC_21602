import React, { useState, useEffect } from 'react';
import { Product } from '../../interfaces/types';
import { ProductService } from '../../services/ProductService';
import { useStats } from '../../contexts/StatsContext';
import ProductForm from './ProductForm';
import ProductList from './ProductList';

const ProductManager: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [showForm, setShowForm] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { stats, refreshStats } = useStats();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError('');
      const fetchedProducts = await ProductService.getAllProducts();
      setProducts(fetchedProducts);
    } catch (err) {
      setError('Error al cargar los productos');
      console.error('Error loading products:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleProductCreated = async (newProduct: Product) => {
    try {
      setIsProcessing(true);
      setProducts([newProduct, ...products]);
      setShowForm(false);
      setSuccessMessage('✅ Producto creado con éxito');
      // Actualizar estadísticas después de crear producto
      await refreshStats();
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProductUpdated = async (updatedProduct: Product) => {
    try {
      setIsProcessing(true);
      setProducts(products.map(p => 
        p.id_producto === updatedProduct.id_producto ? updatedProduct : p
      ));
      setEditingProduct(null);
      setShowForm(false);
      setSuccessMessage('✅ Producto actualizado con éxito');
      // Limpiar mensaje después de 3 segundos
      setTimeout(() => setSuccessMessage(''), 3000);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDeleteProduct = async (id: number) => {
    const confirmed = window.confirm('⚠️ ¿Estás seguro de que quieres eliminar este producto?\n\nEsta acción no se puede deshacer.');
    if (confirmed) {
      try {
        setIsProcessing(true);
        setError('');
        await ProductService.deleteProduct(id);
        setProducts(products.filter(p => p.id_producto !== id));
        setSuccessMessage('🗑️ Producto eliminado con éxito');
        // Actualizar estadísticas después de eliminar producto
        await refreshStats();
        // Limpiar mensaje después de 3 segundos
        setTimeout(() => setSuccessMessage(''), 3000);
      } catch (err) {
        setError('❌ Error al eliminar el producto. Por favor, intenta nuevamente.');
        console.error('Error deleting product:', err);
      } finally {
        setIsProcessing(false);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
        Cargando productos...
      </div>
    );
  }

  return (
    <div className="product-manager">
      <div className="product-header">
        <h2>Gestión de Productos</h2>
        <button 
          className={`btn btn-primary ${isProcessing ? 'loading' : ''}`}
          onClick={() => setShowForm(true)}
          disabled={showForm || isProcessing}
        >
          {isProcessing && <div className="loading-spinner"></div>}
          {showForm ? 'Formulario Activo' : '+ Agregar Producto'}
        </button>
      </div>

      {/* Estadísticas en tiempo real */}
      <div className="stats-container">
        <div className="stat-card highlight">
          <div className="stat-icon">🛍️</div>
          <div className="stat-content">
            <h3>{stats.loading ? '...' : stats.totalProducts}</h3>
            <p>Productos totales</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <h3>{stats.loading ? '...' : stats.totalOrders}</h3>
            <p>Órdenes registradas</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-content">
            <h3>RT</h3>
            <p>Tiempo real</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={() => setError('')} 
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

      {/* Estadísticas de productos */}
      <div className="stats-container">
        <div className="stat-card products">
          <div className="stat-number">{products.length}</div>
          <div className="stat-label">Total Productos</div>
        </div>
        <div className="stat-card low-stock">
          <div className="stat-number">
            {products.filter(p => p.stock < 10).length}
          </div>
          <div className="stat-label">Stock Bajo</div>
        </div>
        <div className="stat-card total-sales">
          <div className="stat-number">
            ${products.reduce((total, p) => total + (p.precio * (p.stock || 0)), 0).toFixed(2)}
          </div>
          <div className="stat-label">Valor Inventario</div>
        </div>
        <div className="stat-card orders">
          <div className="stat-number">
            {products.filter(p => p.stock > 0).length}
          </div>
          <div className="stat-label">En Stock</div>
        </div>
      </div>

      {showForm && (
        <div className="form-section">
          <ProductForm
            product={editingProduct}
            onProductCreated={handleProductCreated}
            onProductUpdated={handleProductUpdated}
            onCancel={handleCancelEdit}
          />
        </div>
      )}

      <ProductList
        products={products}
        onEdit={handleEditProduct}
        onDelete={handleDeleteProduct}
      />
    </div>
  );
};

export default ProductManager;
