import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>Acerca del Desarrollador</h1>
          <div className="profile-image">
            <div className="avatar">👩‍💻</div>
          </div>
        </div>

        <div className="about-content">
          <div className="info-card">
            <h2>Información Grupal</h2>
            <div className="info-grid">
              <div className="info-item">
                <strong>Nombre:</strong>
                <span>Anahy Herrera, Bryan Ortiz, Camila Paredes</span>
              </div>
              <div className="info-item">
                <strong>Correo Electrónico:</strong>
                <span>aeherrera16@espe.edu.ec, baortiz7@espe.edu.ec, csparedes2@espe.edu.ec</span>
              </div>
              <div className="info-item">
                <strong>Carrera:</strong>
                <span>Tecnologías de la Información</span>
              </div>
              <div className="info-item">
                <strong>Institución:</strong>
                <span>Universidad de las Fuerzas Armadas "ESPE"</span>
              </div>
            </div>
          </div>

          <div className="description-card">
            <h2>Descripción del Proyecto</h2>
            <p>
              Este sistema de E-commerce fue desarrollado como proyecto integrador del segundo parcial, 
              implementando una aplicación web dinámica completa utilizando las mejores prácticas de 
              desarrollo web moderno.
            </p>
            
            <h3>Objetivos del Proyecto</h3>
            <ul>
              <li>Implementar una arquitectura limpia y escalable</li>
              <li>Desarrollar funcionalidades CRUD completas</li>
              <li>Integrar frontend y backend de manera eficiente</li>
              <li>Utilizar TypeScript para mayor robustez del código</li>
              <li>Implementar navegación fluida con React Router</li>
              <li>Gestionar datos con PostgreSQL</li>
            </ul>

            <h3>Características Implementadas</h3>
            <div className="features-list">
              <div className="feature-group">
                <h4>🛍️ Gestión de Productos</h4>
                <ul>
                  <li>Crear nuevos productos</li>
                  <li>Editar productos existentes</li>
                  <li>Eliminar productos</li>
                  <li>Control de stock automático</li>
                  <li>Validaciones de datos</li>
                </ul>
              </div>
              
              <div className="feature-group">
                <h4>📋 Gestión de Órdenes</h4>
                <ul>
                  <li>Crear órdenes para clientes</li>
                  <li>Visualizar historial de órdenes</li>
                  <li>Calcular totales automáticamente</li>
                  <li>Editar información de órdenes</li>
                </ul>
              </div>
              
              <div className="feature-group">
                <h4>📊 Detalles de Órdenes</h4>
                <ul>
                  <li>Asociar productos a órdenes</li>
                  <li>Especificar cantidades y precios</li>
                  <li>Ver desglose completo</li>
                  <li>Actualización automática de stock</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="tech-stack-card">
            <h2>Stack Tecnológico</h2>
            <div className="tech-categories">
              <div className="tech-category">
                <h3>Frontend</h3>
                <div className="tech-badges">
                  <span className="tech-badge">React</span>
                  <span className="tech-badge">TypeScript</span>
                  <span className="tech-badge">React Router</span>
                  <span className="tech-badge">CSS3</span>
                  <span className="tech-badge">Fetch API</span>
                </div>
              </div>
              
              <div className="tech-category">
                <h3>Backend</h3>
                <div className="tech-badges">
                  <span className="tech-badge">Node.js</span>
                  <span className="tech-badge">Express</span>
                  <span className="tech-badge">TypeScript</span>
                  <span className="tech-badge">REST API</span>
                </div>
              </div>
              
              <div className="tech-category">
                <h3>Base de Datos</h3>
                <div className="tech-badges">
                  <span className="tech-badge">PostgreSQL</span>
                  <span className="tech-badge">SQL</span>
                  <span className="tech-badge">Triggers</span>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-card">
            <h2>Contacto</h2>
            <p>
              Para consultas sobre este proyecto o colaboraciones futuras, 
              no dudes en contactarme a través del correo electrónico mencionado arriba.
            </p>
            <div className="contact-links">
              <a href="mailto:csparedes2@espe.edu.ec" className="btn btn-primary">
                📧 Enviar Email
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
