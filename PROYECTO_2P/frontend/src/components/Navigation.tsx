import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <Link to="/">E-Commerce</Link>
        </div>
        <ul className="nav-menu">
          <li className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <Link to="/" className="nav-link">Inicio</Link>
          </li>
          <li className={`nav-item ${isActive('/productos') ? 'active' : ''}`}>
            <Link to="/productos" className="nav-link">Productos</Link>
          </li>
          <li className={`nav-item ${isActive('/ordenes') ? 'active' : ''}`}>
            <Link to="/ordenes" className="nav-link">Órdenes</Link>
          </li>
          <li className={`nav-item ${isActive('/detalles-orden') ? 'active' : ''}`}>
            <Link to="/detalles-orden" className="nav-link">Detalles de Órdenes</Link>
          </li>
          <li className={`nav-item ${isActive('/acerca-de') ? 'active' : ''}`}>
            <Link to="/acerca-de" className="nav-link">Acerca de</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
