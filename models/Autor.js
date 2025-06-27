const pool = require("../config/bd");

class Autor {
  constructor({
    id_autor,
    nombre,
    apellido,
    genero,
    fecha_nacimiento,
    nacionalidad,
    biografia,
  }) {
    this.id_autor = id_autor;
    this.nombre = nombre;
    this.apellido = apellido;
    this.genero = genero;
    this.fecha_nacimiento = fecha_nacimiento;
    this.nacionalidad = nacionalidad;
    this.biografia = biografia;
  }

  static async getAll() {
    const result = await pool.query("SELECT * FROM autor ORDER BY apellido");
    return result.rows.map((row) => new Autor(row));
  }

  static async getById(id) {
    const result = await pool.query("SELECT * FROM autor WHERE id_autor = $1", [
      id,
    ]);
    if (result.rows.Count === 0) {
      return null;
    }
    return new Autor(result.rows[0]);
  }

  static async create(autorData) {
    const {
      nombre,
      apellido,
      genero,
      fecha_nacimiento,
      nacionalidad,
      biografia,
    } = autorData;
    const query = `INSERT INTO autor (nombre, apellido, genero, fecha_nacimiento, nacionalidad, biografia) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
    const values = [
      nombre,
      apellido,
      genero,
      fecha_nacimiento,
      nacionalidad,
      biografia,
    ];
    const result = await pool.query(query, values);
    return new Autor(result.rows[0]);
  }

  static async update(id, autorData) {
    const {
      nombre,
      apellido,
      genero,
      fecha_nacimiento,
      nacionalidad,
      biografia,
    } = autorData;
    const query = `UPDATE autor SET nombre = $1, apellido = $2, genero = $3, fecha_nacimiento = $4, nacionalidad = $5, biografia = $6 WHERE id_autor = $7 RETURNING *`;
    const values = [
      nombre,
      apellido,
      genero,
      fecha_nacimiento,
      nacionalidad,
      biografia,
      id,
    ];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) {
      return null;
    }
    return new Autor(result.rows[0]);
  }

  static async delete(id) {
    const result = await pool.query(
      "DELETE FROM autor WHERE id_autor = $1 RETURNING *",
      [id]
    );
    return result.rowsCount > 0;
  }
}

module.exports = Autor;
