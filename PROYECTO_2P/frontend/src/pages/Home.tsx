import React, { useEffect } from 'react';
import { useStats } from '../contexts/StatsContext';

const Home: React.FC = () => {
  const { stats, refreshStats } = useStats();

  useEffect(() => {
    // Scroll al top cuando se carga la página de inicio
    window.scrollTo(0, 0);
    refreshStats();
  }, [refreshStats]);

  // Actualizar estadísticas cada 30 segundos para mantener datos frescos
  useEffect(() => {
    const interval = setInterval(() => {
      refreshStats();
    }, 30000);

    return () => clearInterval(interval);
  }, [refreshStats]);

  return (
    <div className="home">
      {/* Hero Section Mejorado */}
      <div className="hero-section">
        <div className="hero-background">
          <div className="hero-pattern"></div>
        </div>
        <div className="hero-content">
          <div className="hero-badge">
            <span>✨ Sistema E-Commerce Completo</span>
          </div>
          <h1 className="hero-title">
            Gestiona tu negocio con 
            <span className="highlight"> tecnología moderna</span>
          </h1>
          <p className="hero-description">
            Plataforma integral desarrollada con React, TypeScript y Node.js para la gestión 
            eficiente de productos, órdenes y clientes en tiempo real.
          </p>
          
          <div className="hero-actions">
            <a href="/productos" className="btn btn-hero-primary">
              🚀 Empezar Ahora
            </a>
            <a href="/acerca-de" className="btn btn-hero-secondary">
              📖 Conocer Más
            </a>
          </div>

          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-icon">🛍️</div>
              <div className="stat-content">
                <h3>{stats.loading ? '...' : stats.totalProducts}</h3>
                <p>Productos en inventario</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📋</div>
              <div className="stat-content">
                <h3>{stats.loading ? '...' : stats.totalOrders}</h3>
                <p>Órdenes totales</p>
              </div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📊</div>
              <div className="stat-content">
                <h3>⚡</h3>
                <p>Sistema en tiempo real</p>
              </div>
            </div>
          </div>
          
          {/* Botón temporal para debug */}
          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <button 
              onClick={refreshStats}
              className="btn btn-secondary"
              disabled={stats.loading}
            >
              {stats.loading ? '🔄 Actualizando...' : '🔄 Actualizar estadísticas'}
            </button>
          </div>
        </div>
      </div>

      {/* Features Section Mejorado */}
      <div className="features-section">
        <div className="features-container">
          <div className="section-header">
            <h2 className="section-title">
              Funcionalidades <span className="highlight">Poderosas</span>
            </h2>
            <p className="section-subtitle">
              Todo lo que necesitas para administrar tu e-commerce de manera profesional
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-card modern">
              <div className="feature-header">
                <div className="feature-icon gradient-blue">🏪</div>
                <h3>Gestión de Productos</h3>
              </div>
              <p>
                Administra tu inventario con control de stock, validaciones automáticas 
                y una interfaz intuitiva para crear, editar y eliminar productos.
              </p>
              <ul className="feature-list">
                <li>✓ Control de stock en tiempo real</li>
                <li>✓ Validación de datos automática</li>
                <li>✓ Búsqueda y filtros avanzados</li>
              </ul>
              <div className="feature-actions">
                <a href="/productos" className="btn btn-feature">
                  Gestionar Productos →
                </a>
              </div>
            </div>

            <div className="feature-card modern">
              <div className="feature-header">
                <div className="feature-icon gradient-green">🛒</div>
                <h3>Control de Órdenes</h3>
              </div>
              <p>
                Gestiona las órdenes de tus clientes con herramientas avanzadas 
                para el seguimiento y administración del historial completo.
              </p>
              <ul className="feature-list">
                <li>✓ Historial completo de órdenes</li>
                <li>✓ Validación de fechas automática</li>
                <li>✓ Interface amigable y rápida</li>
              </ul>
              <div className="feature-actions">
                <a href="/ordenes" className="btn btn-feature">
                  Ver Órdenes →
                </a>
              </div>
            </div>

            <div className="feature-card modern">
              <div className="feature-header">
                <div className="feature-icon gradient-purple">📊</div>
                <h3>Detalles de Órdenes</h3>
              </div>
              <p>
                Sistema completo para asociar productos a órdenes con cálculo 
                automático de totales y actualización de inventario.
              </p>
              <ul className="feature-list">
                <li>✓ Cálculo automático de totales</li>
                <li>✓ Actualización de stock automática</li>
                <li>✓ Desglose detallado por orden</li>
              </ul>
              <div className="feature-actions">
                <a href="/detalles-ordenes" className="btn btn-feature">
                  Ver Detalles →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nueva sección de tecnologías */}
      <div className="tech-section">
        <div className="tech-container">
          <div className="section-header">
            <h2 className="section-title">
              Tecnologías <span className="highlight">Modernas</span>
            </h2>
            <p className="section-subtitle">
              Construido con las mejores tecnologías para garantizar rendimiento y escalabilidad
            </p>
          </div>

          <div className="tech-stack">
            <div className="tech-category">
              <h3>Frontend</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-logo react">⚛️</div>
                  <span>React 18</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo typescript">🔷</div>
                  <span>TypeScript</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo router">🔗</div>
                  <span>React Router</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo css">🎨</div>
                  <span>CSS3 Modern</span>
                </div>
              </div>
            </div>

            <div className="tech-category">
              <h3>Backend</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-logo node">🟢</div>
                  <span>Node.js</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo express">🚀</div>
                  <span>Express</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo api">📡</div>
                  <span>REST API</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo cors">🔄</div>
                  <span>CORS</span>
                </div>
              </div>
            </div>

            <div className="tech-category">
              <h3>Base de Datos</h3>
              <div className="tech-grid">
                <div className="tech-item">
                  <div className="tech-logo postgres">🐘</div>
                  <span>PostgreSQL</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo sql">💾</div>
                  <span>SQL Avanzado</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo triggers">⚡</div>
                  <span>Triggers</span>
                </div>
                <div className="tech-item">
                  <div className="tech-logo relations">🔗</div>
                  <span>Relaciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
