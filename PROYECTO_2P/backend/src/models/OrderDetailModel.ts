import pool from '../config/database';
import { OrderDetailRow, CreateOrderDetailDTO, UpdateOrderDetailDTO, OrderDetailWithProductRow } from '../interfaces/OrderDetail';

export class OrderDetailModel {
  static async findByOrderId(orderId: number): Promise<OrderDetailWithProductRow[]> {
    const result = await pool.query(`
      SELECT d.*, p.nombre as producto_nombre,
             (d.cantidad * d.precio_unitario) as subtotal
      FROM detalles_orden d
      INNER JOIN productos p ON d.id_producto = p.id_producto
      WHERE d.id_orden = $1
      ORDER BY d.id_detalle
    `, [orderId]);
    return result.rows;
  }

  static async findAll(): Promise<OrderDetailWithProductRow[]> {
    const result = await pool.query(`
      SELECT d.*, p.nombre as producto_nombre, o.cliente,
             (d.cantidad * d.precio_unitario) as subtotal
      FROM detalles_orden d
      INNER JOIN productos p ON d.id_producto = p.id_producto
      INNER JOIN ordenes o ON d.id_orden = o.id_orden
      ORDER BY d.id_orden DESC, d.id_detalle
    `);
    return result.rows;
  }

  static async findById(id: number): Promise<OrderDetailWithProductRow | null> {
    const result = await pool.query(`
      SELECT d.*, p.nombre as producto_nombre,
             (d.cantidad * d.precio_unitario) as subtotal
      FROM detalles_orden d
      INNER JOIN productos p ON d.id_producto = p.id_producto
      WHERE d.id_detalle = $1
    `, [id]);
    return result.rows[0] || null;
  }

  static async create(detailData: CreateOrderDetailDTO): Promise<OrderDetailRow> {
    // Verificar que la orden existe
    const orderExists = await pool.query('SELECT id_orden FROM ordenes WHERE id_orden = $1', [detailData.id_orden]);
    if (orderExists.rows.length === 0) {
      throw new Error('Order not found');
    }

    // Verificar que el producto existe y tiene suficiente stock
    const productResult = await pool.query('SELECT stock FROM productos WHERE id_producto = $1', [detailData.id_producto]);
    if (productResult.rows.length === 0) {
      throw new Error('Product not found');
    }

    const product = productResult.rows[0];
    if (product.stock < detailData.cantidad) {
      throw new Error('Insufficient stock');
    }

    // Crear el detalle de orden
    const result = await pool.query(
      'INSERT INTO detalles_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES ($1, $2, $3, $4) RETURNING *',
      [detailData.id_orden, detailData.id_producto, detailData.cantidad, detailData.precio_unitario]
    );

    // Actualizar el stock del producto
    await pool.query(
      'UPDATE productos SET stock = stock - $1 WHERE id_producto = $2',
      [detailData.cantidad, detailData.id_producto]
    );

    return result.rows[0];
  }

  static async update(id: number, detailData: UpdateOrderDetailDTO): Promise<OrderDetailRow | null> {
    // Obtener el detalle actual
    const currentDetail = await pool.query('SELECT * FROM detalles_orden WHERE id_detalle = $1', [id]);
    if (currentDetail.rows.length === 0) {
      throw new Error('Order detail not found');
    }

    const current = currentDetail.rows[0];
    const cantidadAnterior = current.cantidad;
    const nuevaCantidad = detailData.cantidad || cantidadAnterior;

    // Si cambia la cantidad, verificar stock
    if (detailData.cantidad && detailData.cantidad !== cantidadAnterior) {
      const productResult = await pool.query('SELECT stock FROM productos WHERE id_producto = $1', [current.id_producto]);
      const stockActual = productResult.rows[0].stock + cantidadAnterior; // Stock original antes de la orden anterior
      
      if (stockActual < nuevaCantidad) {
        throw new Error('Insufficient stock');
      }

      // Restaurar stock anterior y aplicar nuevo stock
      await pool.query(
        'UPDATE productos SET stock = stock + $1 - $2 WHERE id_producto = $3',
        [cantidadAnterior, nuevaCantidad, current.id_producto]
      );
    }

    const fields = [];
    const values = [];
    let paramCount = 1;

    if (detailData.cantidad !== undefined) {
      fields.push(`cantidad = $${paramCount}`);
      values.push(detailData.cantidad);
      paramCount++;
    }
    if (detailData.precio_unitario !== undefined) {
      fields.push(`precio_unitario = $${paramCount}`);
      values.push(detailData.precio_unitario);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE detalles_orden SET ${fields.join(', ')} WHERE id_detalle = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    // Obtener el detalle antes de eliminarlo para restaurar el stock
    const detailResult = await pool.query('SELECT * FROM detalles_orden WHERE id_detalle = $1', [id]);
    if (detailResult.rows.length === 0) {
      return false;
    }

    const detail = detailResult.rows[0];

    // Restaurar el stock
    await pool.query(
      'UPDATE productos SET stock = stock + $1 WHERE id_producto = $2',
      [detail.cantidad, detail.id_producto]
    );

    // Eliminar el detalle
    const result = await pool.query(
      'DELETE FROM detalles_orden WHERE id_detalle = $1',
      [id]
    );

    return result.rowCount! > 0;
  }
}
