import React from 'react';
import Producto from './Producto';

const FichaProducto = ({
  productos,
  nuevoProducto,
  setNuevoProducto,
  esValido,
  agregarProducto,
  actualizarProducto,
  eliminarProducto,
  siguienteId
}) => {
  // Orden descendente por ID
  const productosOrdenados = [...productos].sort((a, b) => b.id - a.id);

  return (
    <table border="1" cellPadding="5" cellSpacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Cantidad</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
        <tr>
          <td>{siguienteId}</td>
          <td>
            <input
              type="text"
              placeholder="Nombre"
              value={nuevoProducto.nombre}
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Cantidad"
              value={nuevoProducto.cantidad}
              min="0"
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, cantidad: e.target.value })}
            />
          </td>
          <td>
            <input
              type="number"
              placeholder="Precio"
              value={nuevoProducto.precio}
              min="0"
              onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
            />
          </td>
          <td>
            <button onClick={agregarProducto} disabled={!esValido()}>
              Agregar
            </button>
          </td>
        </tr>
      </thead>
      <tbody>
        {productosOrdenados.map((prod) => (
          <Producto
            key={prod.id}
            {...prod}
            actualizarProducto={actualizarProducto}
            eliminarProducto={eliminarProducto}
          />
        ))}
      </tbody>
    </table>
  );
};

export default FichaProducto;
