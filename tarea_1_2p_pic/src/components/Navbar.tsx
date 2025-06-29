import { Link } from 'react-router-dom';
import '../App.css'; // Esto es correcto si App.css está en src/

const Navbar = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/estadistica">Cálculos estadísticos</Link></li>
        <li><Link to="/ecuaciones">Resolución de ecuaciones</Link></li>
        <li><Link to="/inventario">Gestión de inventario</Link></li>
        <li><Link to="/datos">Datos Informativos</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
