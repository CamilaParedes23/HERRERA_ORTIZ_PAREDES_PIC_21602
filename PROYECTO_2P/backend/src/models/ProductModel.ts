import pool from '../config/database';
import { ProductRow, CreateProductDTO, UpdateProductDTO } from '../interfaces/Product';

export class ProductModel {
  static async findAll(): Promise<ProductRow[]> {
    const result = await pool.query(
      'SELECT * FROM productos ORDER BY id_producto DESC'
    );
    return result.rows;
  }

  static async findById(id: number): Promise<ProductRow | null> {
    const result = await pool.query(
      'SELECT * FROM productos WHERE id_producto = $1',
      [id]
    );
    return result.rows[0] || null;
  }

  static async create(productData: CreateProductDTO): Promise<ProductRow> {
    const result = await pool.query(
      'INSERT INTO productos (nombre, precio, stock) VALUES ($1, $2, $3) RETURNING *',
      [productData.nombre, productData.precio, productData.stock]
    );
    return result.rows[0];
  }

  static async update(id: number, productData: UpdateProductDTO): Promise<ProductRow | null> {
    const fields = [];
    const values = [];
    let paramCount = 1;

    if (productData.nombre !== undefined) {
      fields.push(`nombre = $${paramCount}`);
      values.push(productData.nombre);
      paramCount++;
    }
    if (productData.precio !== undefined) {
      fields.push(`precio = $${paramCount}`);
      values.push(productData.precio);
      paramCount++;
    }
    if (productData.stock !== undefined) {
      fields.push(`stock = $${paramCount}`);
      values.push(productData.stock);
      paramCount++;
    }

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    values.push(id);
    const result = await pool.query(
      `UPDATE productos SET ${fields.join(', ')} WHERE id_producto = $${paramCount} RETURNING *`,
      values
    );

    return result.rows[0] || null;
  }

  static async delete(id: number): Promise<boolean> {
    const result = await pool.query(
      'DELETE FROM productos WHERE id_producto = $1',
      [id]
    );
    return result.rowCount! > 0;
  }
}
