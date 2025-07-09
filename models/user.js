const pool = require('../config/bd');

class User {
  constructor({ id, nombres, apellidos, email, password, tipo_usuario }) {
    this.id = id;
    this.nombres = nombres;
    this.apellidos = apellidos;
    this.email = email;
    this.password = password;
    this.tipo_usuario = tipo_usuario;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM usuarios ORDER BY id');
    return result.rows.map(row => new User(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  static async getByEmail(email) {
    const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  static async create(userData) {
    const { nombres, apellidos, email, password, tipo_usuario } = userData;
    const query = `
      INSERT INTO usuarios (nombres, apellidos, email, password, tipo_usuario)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *`;
    const values = [nombres, apellidos, email, password, tipo_usuario];
    const result = await pool.query(query, values);
    return new User(result.rows[0]);
  }

  static async update(id, userData) {
    const { nombres, apellidos, email, password, tipo_usuario } = userData;
    const query = `
      UPDATE usuarios
      SET nombres = $1, apellidos = $2, email = $3, password = $4, tipo_usuario = $5
      WHERE id = $6
      RETURNING *`;
    const values = [nombres, apellidos, email, password, tipo_usuario, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return null;
    return new User(result.rows[0]);
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM usuarios WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = User;