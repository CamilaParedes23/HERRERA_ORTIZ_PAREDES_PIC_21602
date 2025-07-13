import pool from '../config/database';
import { OrderRow, CreateOrderDTO, UpdateOrderDTO } from '../interfaces/Order';

export class OrderModel {
  static async findAll(): Promise<OrderRow[]> {
    const result = await pool.query(`
      SELECT o.*, 
             COALESCE(SUM(d.cantidad * d.precio_unitario), 0) as total
      FROM ordenes o
      LEFT JOIN detalles_orden d ON o.id_orden = d.id_orden
      GROUP BY o.id_orden
      ORDER BY o.id_orden DESC
    `);
    return result.rows;
  }

  static async findById(id: number): Promise<OrderRow | null> {
    const result = await pool.query(`
      SELECT o.*, 
             COALESCE(SUM(d.cantidad * d.precio_unitario), 0) as total
      FROM ordenes o
      LEFT JOIN detalles_orden d ON o.id_orden = d.id_orden
      WHERE o.id_orden = $1
      GROUP BY o.id_orden
    `, [id]);
    return result.rows[0] || null;
  }

  static async create(orderData: CreateOrderDTO): Promise<OrderRow> {
    const fecha = orderData.fecha || new Date();
    const result = await pool.query(
      'INSERT INTO ordenes (cliente, fecha) VALUES ($1, $2) RETURNING *',
      [orderData.cliente, fecha]
    );
    return result.rows[0];
  }

  static async update(id: number, orderData: UpdateOrderDTO): Promise<OrderRow | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (orderData.cliente !== undefined) {
      fields.push(`cliente = $${paramCount}`);
      values.push(orderData.cliente);
      paramCount++;
    }
    if (orderData.fecha !== undefined) {
      fields.push(`fecha = $${paramCount}`);
      values.push(orderData.fecha);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE ordenes SET ${fields.join(', ')} WHERE id_orden = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM ordenes WHERE id_orden = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}
