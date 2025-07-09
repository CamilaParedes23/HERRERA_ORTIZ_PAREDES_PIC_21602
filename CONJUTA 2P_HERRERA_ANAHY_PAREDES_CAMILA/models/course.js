// models/course.js
const pool = require('../config/bd');

class Course {
  constructor({ id, nombre, descripcion, estado, creador_id }) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.estado = estado;
    this.creador_id = creador_id;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM cursos ORDER BY id');
    return result.rows.map(row => new Course(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM cursos WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return new Course(result.rows[0]);
  }

  static async create(courseData) {
    const { nombre, descripcion, estado, creador_id } = courseData;
    const query = `
      INSERT INTO cursos (nombre, descripcion, estado, creador_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *`;
    const values = [nombre, descripcion, estado, creador_id];
    const result = await pool.query(query, values);
    return new Course(result.rows[0]);
  }

  static async update(id, courseData) {
    const { nombre, descripcion, estado, creador_id } = courseData;
    const query = `
      UPDATE cursos
      SET nombre = $1, descripcion = $2, estado = $3, creador_id = $4
      WHERE id = $5
      RETURNING *`;
    const values = [nombre, descripcion, estado, creador_id, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return null;
    return new Course(result.rows[0]);
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM cursos WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }
}

module.exports = Course;