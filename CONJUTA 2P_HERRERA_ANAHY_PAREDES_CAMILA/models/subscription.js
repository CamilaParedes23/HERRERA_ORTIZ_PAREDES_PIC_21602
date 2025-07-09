const pool = require('../config/bd');
const Course = require('./course');
const User = require('./user');

class Subscription {
  constructor({ id, consumidor_id, curso_id }) {
    this.id = id;
    this.consumidor_id = consumidor_id;
    this.curso_id = curso_id;
  }

  static async getAll() {
    const result = await pool.query('SELECT * FROM suscripciones ORDER BY id');
    return result.rows.map(row => new Subscription(row));
  }

  static async getById(id) {
    const result = await pool.query('SELECT * FROM suscripciones WHERE id = $1', [id]);
    if (result.rows.length === 0) return null;
    return new Subscription(result.rows[0]);
  }

  static async create(subscriptionData) {
    const { consumidor_id, curso_id } = subscriptionData;

    // Validar que el consumidor exista y sea un consumidor de cursos
    const consumer = await User.getById(consumidor_id);
    if (!consumer || consumer.tipo_usuario !== 'Consumidor de Cursos') {
      throw new Error('Only Course Consumers can subscribe to courses.');
    }

    // Validar que el curso exista y esté activo
    const course = await Course.getById(curso_id);
    if (!course || course.estado !== 'Activo') {
      throw new Error('Course is not active.');
    }

    // Validar que el consumidor no esté ya suscrito a este curso
    const existingSubscription = await Subscription.getByConsumerAndCourse(consumidor_id, curso_id);
    if (existingSubscription) {
      throw new Error('Consumer is already subscribed to this course.');
    }

    // Validar que el consumidor no esté suscrito a otro curso del mismo creador
    const subscriptionsFromSameCreator = await Subscription.getSubscriptionsByConsumerAndCreator(consumidor_id, course.creador_id);
    if (subscriptionsFromSameCreator.length > 0) {
      throw new Error('Consumer cannot subscribe to more than one course from the same creator.');
    }

    // Insertar la suscripción en la base de datos
    const query = `
      INSERT INTO suscripciones (consumidor_id, curso_id)
      VALUES ($1, $2)
      RETURNING *`;
    const values = [consumidor_id, curso_id];
    const result = await pool.query(query, values);
    return new Subscription(result.rows[0]);
  }

  static async update(id, subscriptionData) {
    const { consumidor_id, curso_id } = subscriptionData;

    // Validar que la suscripción exista
    const existingSubscription = await Subscription.getById(id);
    if (!existingSubscription) {
      throw new Error('Subscription not found.');
    }

    // Validar que el consumidor y el curso sean válidos
    const consumer = await User.getById(consumidor_id);
    if (!consumer || consumer.tipo_usuario !== 'Consumidor de Cursos') {
      throw new Error('Only Course Consumers can subscribe to courses.');
    }

    const course = await Course.getById(curso_id);
    if (!course || course.estado !== 'Activo') {
      throw new Error('Course is not active.');
    }

    // Actualizar la suscripción en la base de datos
    const query = `
      UPDATE suscripciones
      SET consumidor_id = $1, curso_id = $2
      WHERE id = $3
      RETURNING *`;
    const values = [consumidor_id, curso_id, id];
    const result = await pool.query(query, values);
    if (result.rows.length === 0) return null;
    return new Subscription(result.rows[0]);
  }

  static async delete(id) {
    const result = await pool.query('DELETE FROM suscripciones WHERE id = $1 RETURNING *', [id]);
    return result.rowCount > 0;
  }

  static async getByConsumerAndCourse(consumidor_id, curso_id) {
    const result = await pool.query('SELECT * FROM suscripciones WHERE consumidor_id = $1 AND curso_id = $2', [consumidor_id, curso_id]);
    if (result.rows.length === 0) return null;
    return new Subscription(result.rows[0]);
  }

  static async getSubscriptionsByConsumerAndCreator(consumidor_id, creador_id) {
    const result = await pool.query(`
      SELECT s.*
      FROM suscripciones s
      JOIN cursos c ON s.curso_id = c.id
      WHERE s.consumidor_id = $1 AND c.creador_id = $2`, [consumidor_id, creador_id]);
    return result.rows.map(row => new Subscription(row));
  }
}

module.exports = Subscription;