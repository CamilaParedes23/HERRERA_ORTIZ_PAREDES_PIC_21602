// src/components/Layout/Navbar.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Importa useAuth de manera predeterminada

const Navbar = () => {
  const { user } = useAuth(); // Usa useAuth para obtener el usuario

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Inicio</Link>
        </li>
        <li>
          <Link to="/courses">Cursos</Link>
        </li>
        <li>
          <Link to="/subscriptions">Suscripciones</Link>
        </li>
        {user ? (
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Registrarse</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;