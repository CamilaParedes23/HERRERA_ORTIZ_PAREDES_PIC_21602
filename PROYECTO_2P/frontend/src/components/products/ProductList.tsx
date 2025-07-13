import React, { useState, useMemo } from 'react';
import { Product } from '../../interfaces/types';

interface ProductListProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nombre');

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.nombre.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    });

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'nombre':
          return a.nombre.localeCompare(b.nombre);
        case 'precio':
          return a.precio - b.precio;
        case 'stock':
          return (b.stock || 0) - (a.stock || 0);
        case 'id':
          return a.id_producto - b.id_producto;
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, sortBy]);
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(price);
  };

  const formatDate = (dateString?: string): string => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('es-CO');
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="product-list">
        <div className="filters-container">
          <input
            type="text"
            placeholder="🔍 Buscar productos por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="nombre">Ordenar por Nombre</option>
            <option value="precio">Ordenar por Precio</option>
            <option value="stock">Ordenar por Stock</option>
            <option value="id">Ordenar por ID</option>
          </select>
        </div>
        
        <div className="table-empty">
          {searchTerm ? 
            `No se encontraron productos que coincidan con "${searchTerm}"` :
            'No hay productos registrados'
          }
        </div>
      </div>
    );
  }

  return (
    <div className="product-list">
      <h3>Lista de Productos ({filteredProducts.length})</h3>
      
      {/* Filtros y búsqueda */}
      <div className="filters-container">
        <input
          type="text"
          placeholder="🔍 Buscar productos por nombre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="filter-select"
        >
          <option value="nombre">Ordenar por Nombre</option>
          <option value="precio">Ordenar por Precio</option>
          <option value="stock">Ordenar por Stock</option>
          <option value="id">Ordenar por ID</option>
        </select>
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="btn btn-secondary"
            title="Limpiar búsqueda"
          >
            ✕ Limpiar
          </button>
        )}
      </div>

      <div className="table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Stock</th>
              <th>Fecha Creación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id_producto}>
                <td>{product.id_producto}</td>
                <td className="product-name">{product.nombre}</td>
                <td className="product-price">{formatPrice(product.precio)}</td>
                <td className={`product-stock ${product.stock === 0 ? 'out-of-stock' : ''}`}>
                  {product.stock}
                  {product.stock === 0 && <span className="stock-warning"> ⚠️</span>}
                </td>
                <td>{formatDate(product.created_at)}</td>
                <td className="actions">
                  <button
                    className="btn btn-sm btn-edit"
                    onClick={() => onEdit(product)}
                    title="Editar producto"
                  >
                    ✏️ Editar
                  </button>
                  <button
                    className="btn btn-sm btn-delete"
                    onClick={() => onDelete(product.id_producto)}
                    title="Eliminar producto"
                  >
                    🗑️ Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
