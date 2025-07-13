import pool from './database';

export const initializeDatabase = async () => {
  try {
    // Crear tabla productos
    await pool.query(`
      CREATE TABLE IF NOT EXISTS productos (
        id_producto SERIAL PRIMARY KEY,
        nombre VARCHAR(255) NOT NULL,
        precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
        stock INTEGER NOT NULL CHECK (stock >= 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla ordenes
    await pool.query(`
      CREATE TABLE IF NOT EXISTS ordenes (
        id_orden SERIAL PRIMARY KEY,
        fecha DATE NOT NULL DEFAULT CURRENT_DATE,
        cliente VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Crear tabla detalles_orden
    await pool.query(`
      CREATE TABLE IF NOT EXISTS detalles_orden (
        id_detalle SERIAL PRIMARY KEY,
        id_orden INTEGER REFERENCES ordenes(id_orden) ON DELETE CASCADE,
        id_producto INTEGER REFERENCES productos(id_producto) ON DELETE CASCADE,
        cantidad INTEGER NOT NULL CHECK (cantidad > 0),
        precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario > 0),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(id_orden, id_producto)
      )
    `);

    // Crear trigger para actualizar updated_at
    await pool.query(`
      CREATE OR REPLACE FUNCTION update_updated_at_column()
      RETURNS TRIGGER AS $$
      BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
      END;
      $$ language 'plpgsql';
    `);

    // Aplicar triggers
    await pool.query(`
      DROP TRIGGER IF EXISTS update_productos_updated_at ON productos;
      CREATE TRIGGER update_productos_updated_at 
        BEFORE UPDATE ON productos 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_ordenes_updated_at ON ordenes;
      CREATE TRIGGER update_ordenes_updated_at 
        BEFORE UPDATE ON ordenes 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    await pool.query(`
      DROP TRIGGER IF EXISTS update_detalles_orden_updated_at ON detalles_orden;
      CREATE TRIGGER update_detalles_orden_updated_at 
        BEFORE UPDATE ON detalles_orden 
        FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
    `);

    console.log('✅ Database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};
