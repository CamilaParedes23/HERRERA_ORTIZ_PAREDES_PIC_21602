import React, { useState } from 'react';
import FichaProducto from './FichaProducto';

const Inventario = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: "Producto inicial", cantidad: 0, precio: 0 }
  ]);
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', cantidad: '0', precio: '0' });
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState(''); // 'exito' o 'error'

  const siguienteId = productos.length > 0
    ? Math.max(...productos.map(p => p.id)) + 1
    : 1;

  const esValido = () => {
    if (!nuevoProducto.nombre.trim()) return false;
    if (parseInt(nuevoProducto.cantidad) < 0 || parseFloat(nuevoProducto.precio) < 0) return false;
    return true;
  };

  const agregarProducto = () => {
    if (!nuevoProducto.nombre.trim()) {
      setMensaje("El nombre no puede estar vacío");
      setTipoMensaje('error');
      return;
    }

    // Validar que el nombre no se repita (ignora mayúsculas/minúsculas)
    if (productos.some(p => p.nombre.toLowerCase() === nuevoProducto.nombre.trim().toLowerCase())) {
      setMensaje("Ese nombre ya existe, ingrese otro diferente");
      setTipoMensaje('error');
      return;
    }

    if (parseInt(nuevoProducto.cantidad) < 0 || parseFloat(nuevoProducto.precio) < 0) {
      setMensaje("No se pueden ingresar números negativos en cantidad o precio");
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

  const actualizarProducto = (id, campo, nuevoValor) => {
    if ((campo === 'cantidad' || campo === 'precio') && parseFloat(nuevoValor) < 0) {
      setMensaje("No se pueden ingresar números negativos en cantidad o precio");
      setTipoMensaje('error');
      return;
    }
    setProductos(productos.map(p =>
      p.id === id ? { ...p, [campo]: campo === 'nombre' ? nuevoValor : parseFloat(nuevoValor) } : p
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
        actualizarProducto={updateProducto => actualizarProducto(...updateProducto)}
        eliminarProducto={eliminarProducto}
        siguienteId={siguienteId}
      />
    </div>
  );
};

export default Inventario;
