const pool = require('../config/bd');

class Libro{
    constructor({id_libro, titulo, id_autor, descripcion, genero, anio, editorial}){
        this.id_libro = id_libro;
        this.titulo = titulo;
        this.id_autor = id_autor;
        this.descripcion = descripcion;
        this.genero = genero;
        this.anio = anio;
        this.editorial = editorial;
    }

    //Seleccionar todos los libros
    static async getAll() {
        const result = await pool.query('SELECT * FROM libro ORDER BY titulo');
        return result.rows.map(row => new Libro(row));
    }

    //Seleccionar un libro por su id
    static async getById(id) {
        const result = await pool.query('SELECT * FROM libro WHERE id_libro = $1', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Libro(result.rows[0]);
    }

    //Crear un libro
    static async create(libroData) {
        const { titulo, id_autor, descripcion, genero, anio, editorial } = libroData;
        const query = `INSERT INTO libro (titulo, id_autor, descripcion, genero, anio, editorial) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`;
        const values = [titulo, id_autor, descripcion, genero, anio, editorial];
        const result = await pool.query(query, values);
        return new Libro(result.rows[0]);
    }

    //Actualizar un libro
    static async update(id, libroData) {
        const { titulo, id_autor, descripcion, genero, anio, editorial } = libroData;
        const query = `UPDATE libro SET titulo = $1, id_autor = $2, descripcion = $3, genero = $4, anio = $5, editorial = $6 WHERE id_libro = $7 RETURNING *`;
        const values = [titulo, id_autor, descripcion, genero, anio, editorial, id];
        const result = await pool.query(query, values);
        if (result.rows.length === 0) {
            return null;
        }
        return new Libro(result.rows[0]);
    }

    //Eliminar un libro
    static async delete(id) {
        const result = await pool.query('DELETE FROM libro WHERE id_libro = $1 RETURNING *', [id]);
        if (result.rows.length === 0) {
            return null;
        }
        return new Libro(result.rows[0]);
    }
}