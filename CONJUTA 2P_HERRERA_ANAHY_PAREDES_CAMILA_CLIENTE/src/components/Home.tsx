// src/components/Home.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Sistema de Suscripción a Cursos en Línea</h1>
      <p>Esta es una plataforma donde podrás administrar cursos y suscripciones..</p>
      <nav>
        <ul>
          <li>
            <Link to="/courses">Ver cursos</Link>
          </li>
          <li>
            <Link to="/subscriptions">Ver suscripciones</Link>
          </li>
          <li>
            <Link to="/create-course">Crear un nuevo curso</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;