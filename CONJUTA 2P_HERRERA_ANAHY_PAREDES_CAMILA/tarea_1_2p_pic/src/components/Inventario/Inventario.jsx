import React, { useState } from 'react';
import FichaProducto from './FichaProducto';

const Inventario = () => {
  // data hardcoded
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Producto inicial", cantidad: 0, precio: 0 },
    { id: 2, nombre: "Producto inicial 1", cantidad: 1, precio: 1 }
  ]);

  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '0', precio: '0' });
  
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'exito' o 'error'

  const siguienteId = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;

    const esValido = () => {
      return (
        nuevoProducto.nombre.trim() !== '' &&
        nuevoProducto.cantidad !== '' &&
        nuevoProducto.precio !== '' &&
        parseFloat(nuevoProducto.cantidad) > 0 &&
        parseFloat(nuevoProducto.precio) > 0
      );
    };
    
    

    const agregarProducto = () => {
      if (!esValido()) {
        setMensaje("Por favor complete todos los campos y asegúrese que la cantidad y el precio sean mayores a cero.");
        setTipoMensaje('error');
        return;
      }
    
      if (productos.some(p => p.nombre.toLowerCase() === nuevoProducto.nombre.trim().toLowerCase())) {
        setMensaje("Ese nombre ya existe, ingrese otro diferente");
        setTipoMensaje('error');
        return;
      }
    
      setProductos([
        ...productos,
        {
          id: siguienteId,
          nombre: nuevoProducto.nombre.trim(),
          cantidad: parseInt(nuevoProducto.cantidad),
          precio: parseFloat(nuevoProducto.precio)
        }
      ]);
      setNuevoProducto({ nombre: '', cantidad: '0', precio: '0' });
      setMensaje("Producto agregado correctamente");
      setTipoMensaje('exito');
    };
    
  

  const actualizarProducto = (id, nombre, cantidad, precio) => {
    setProductos(productos.map(p =>
      p.id === id ? { ...p, nombre, cantidad: parseFloat(cantidad), precio: parseFloat(precio) } : p
    ));
    setMensaje("Producto actualizado correctamente");
    setTipoMensaje('exito');
  };

  const eliminarProducto = (id) => {
    setProductos(productos.filter(p => p.id !== id));
    setMensaje("Producto eliminado correctamente");
    setTipoMensaje('exito');
  };

  return (
    <div className="inventario">
      <h2>Gestión de Inventario</h2>

      {mensaje && (
        <p style={{ color: tipoMensaje === 'error' ? 'red' : 'green' }}>{mensaje}</p>
      )}

<FichaProducto
  productos={productos}
  nuevoProducto={nuevoProducto}
  setNuevoProducto={setNuevoProducto}
  esValido={esValido}
  agregarProducto={agregarProducto}
  actualizarProducto={actualizarProducto}
  eliminarProducto={eliminarProducto}
  siguienteId={siguienteId}
/>

    </div>
  );
};

export default Inventario;
