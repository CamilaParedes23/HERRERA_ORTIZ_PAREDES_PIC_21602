-- ================================================
-- SCRIPT DE CONFIGURACIÓN INICIAL DE BASE DE DATOS
-- Sistema E-Commerce - Proyecto Integrador
-- ================================================

-- Crear la base de datos si no existe
-- NOTA: Este comando debe ejecutarse desde psql conectado a postgres
-- CREATE DATABASE ecommerce_db;

-- ================================================
-- CONECTARSE A LA BASE DE DATOS ECOMMERCE_DB
-- ================================================

-- Usar la base de datos (en psql: \c ecommerce_db)

-- ================================================
-- ELIMINACIÓN DE TABLAS EXISTENTES (SI EXISTEN)
-- ================================================

DROP TABLE IF EXISTS detalles_orden CASCADE;
DROP TABLE IF EXISTS ordenes CASCADE;
DROP TABLE IF EXISTS productos CASCADE;

-- ================================================
-- CREACIÓN DE TABLAS
-- ================================================

-- Tabla de Productos
CREATE TABLE productos (
    id_producto SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    precio DECIMAL(10,2) NOT NULL CHECK (precio > 0),
    stock INTEGER NOT NULL CHECK (stock >= 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Órdenes
CREATE TABLE ordenes (
    id_orden SERIAL PRIMARY KEY,
    fecha DATE NOT NULL DEFAULT CURRENT_DATE,
    cliente VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Detalles de Orden
CREATE TABLE detalles_orden (
    id_detalle SERIAL PRIMARY KEY,
    id_orden INTEGER NOT NULL REFERENCES ordenes(id_orden) ON DELETE CASCADE,
    id_producto INTEGER NOT NULL REFERENCES productos(id_producto) ON DELETE CASCADE,
    cantidad INTEGER NOT NULL CHECK (cantidad > 0),
    precio_unitario DECIMAL(10,2) NOT NULL CHECK (precio_unitario > 0),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Constraint para evitar duplicados de producto en la misma orden
    UNIQUE(id_orden, id_producto)
);

-- ================================================
-- ÍNDICES PARA OPTIMIZAR CONSULTAS
-- ================================================

CREATE INDEX idx_productos_nombre ON productos(nombre);
CREATE INDEX idx_ordenes_fecha ON ordenes(fecha);
CREATE INDEX idx_ordenes_cliente ON ordenes(cliente);
CREATE INDEX idx_detalles_orden_id_orden ON detalles_orden(id_orden);
CREATE INDEX idx_detalles_orden_id_producto ON detalles_orden(id_producto);

-- ================================================
-- FUNCIONES PARA TRIGGERS
-- ================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION actualizar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Función para validar stock antes de crear/actualizar detalle de orden
CREATE OR REPLACE FUNCTION validar_stock_detalle()
RETURNS TRIGGER AS $$
DECLARE
    stock_actual INTEGER;
    stock_usado INTEGER := 0;
BEGIN
    -- Obtener stock actual del producto
    SELECT stock INTO stock_actual 
    FROM productos 
    WHERE id_producto = NEW.id_producto;
    
    -- Si es una actualización, restar la cantidad anterior
    IF TG_OP = 'UPDATE' THEN
        stock_usado := OLD.cantidad;
    END IF;
    
    -- Calcular stock usado en otras órdenes (excluyendo la actual si es UPDATE)
    SELECT COALESCE(SUM(cantidad), 0) INTO stock_usado
    FROM detalles_orden 
    WHERE id_producto = NEW.id_producto 
    AND (TG_OP = 'INSERT' OR id_detalle != NEW.id_detalle);
    
    -- Verificar si hay suficiente stock
    IF stock_actual < (stock_usado + NEW.cantidad) THEN
        RAISE EXCEPTION 'Stock insuficiente. Stock disponible: %, Cantidad solicitada: %, Ya usado: %', 
                       stock_actual, NEW.cantidad, stock_usado;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ================================================
-- TRIGGERS
-- ================================================

-- Triggers para actualizar updated_at automáticamente
CREATE TRIGGER trigger_productos_updated_at
    BEFORE UPDATE ON productos
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_ordenes_updated_at
    BEFORE UPDATE ON ordenes
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

CREATE TRIGGER trigger_detalles_orden_updated_at
    BEFORE UPDATE ON detalles_orden
    FOR EACH ROW
    EXECUTE FUNCTION actualizar_updated_at();

-- Triggers para validación de stock
CREATE TRIGGER trigger_validar_stock_insert
    BEFORE INSERT ON detalles_orden
    FOR EACH ROW
    EXECUTE FUNCTION validar_stock_detalle();

CREATE TRIGGER trigger_validar_stock_update
    BEFORE UPDATE ON detalles_orden
    FOR EACH ROW
    EXECUTE FUNCTION validar_stock_detalle();

-- ================================================
-- DATOS DE PRUEBA
-- ================================================

-- Insertar productos de ejemplo
INSERT INTO productos (nombre, precio, stock) VALUES
('Laptop Dell Inspiron 15', 899.99, 10),
('Mouse Logitech MX Master 3', 99.99, 25),
('Teclado Mecánico Corsair K70', 159.99, 15),
('Monitor Samsung 24"', 199.99, 8),
('Webcam Logitech C920', 79.99, 20),
('Auriculares Sony WH-1000XM4', 299.99, 12),
('Smartphone Samsung Galaxy S21', 699.99, 18),
('Tablet iPad Air', 599.99, 6),
('Impresora HP LaserJet', 249.99, 5),
('Disco Duro Externo 1TB', 89.99, 30);

-- Insertar órdenes de ejemplo
INSERT INTO ordenes (cliente, fecha) VALUES
('Juan Pérez', '2024-01-15'),
('María García', '2024-01-16'),
('Carlos López', '2024-01-17'),
('Ana Martínez', '2024-01-18'),
('Luis Rodríguez', '2024-01-19');

-- Insertar detalles de orden de ejemplo
INSERT INTO detalles_orden (id_orden, id_producto, cantidad, precio_unitario) VALUES
-- Orden 1: Juan Pérez
(1, 1, 1, 899.99),  -- 1 Laptop
(1, 2, 1, 99.99),   -- 1 Mouse
(1, 3, 1, 159.99),  -- 1 Teclado

-- Orden 2: María García
(2, 4, 2, 199.99),  -- 2 Monitores
(2, 5, 1, 79.99),   -- 1 Webcam

-- Orden 3: Carlos López
(3, 6, 1, 299.99),  -- 1 Auriculares
(3, 7, 1, 699.99),  -- 1 Smartphone

-- Orden 4: Ana Martínez
(4, 8, 1, 599.99),  -- 1 Tablet
(4, 10, 2, 89.99),  -- 2 Discos Duros

-- Orden 5: Luis Rodríguez
(5, 9, 1, 249.99),  -- 1 Impresora
(5, 2, 2, 99.99);   -- 2 Mouse adicionales

-- ================================================
-- VISTAS ÚTILES
-- ================================================

-- Vista para mostrar órdenes con totales calculados
CREATE OR REPLACE VIEW vista_ordenes_completa AS
SELECT 
    o.id_orden,
    o.cliente,
    o.fecha,
    COUNT(d.id_detalle) as total_items,
    SUM(d.cantidad * d.precio_unitario) as total_orden,
    o.created_at,
    o.updated_at
FROM ordenes o
LEFT JOIN detalles_orden d ON o.id_orden = d.id_orden
GROUP BY o.id_orden, o.cliente, o.fecha, o.created_at, o.updated_at
ORDER BY o.fecha DESC, o.id_orden DESC;

-- Vista para mostrar detalles de orden con información de productos
CREATE OR REPLACE VIEW vista_detalles_completa AS
SELECT 
    d.id_detalle,
    d.id_orden,
    o.cliente,
    o.fecha,
    d.id_producto,
    p.nombre as producto_nombre,
    d.cantidad,
    d.precio_unitario,
    (d.cantidad * d.precio_unitario) as subtotal,
    p.stock as stock_disponible,
    d.created_at,
    d.updated_at
FROM detalles_orden d
JOIN productos p ON d.id_producto = p.id_producto
JOIN ordenes o ON d.id_orden = o.id_orden
ORDER BY d.id_orden, d.id_detalle;

-- Vista para mostrar productos con información de stock y ventas
CREATE OR REPLACE VIEW vista_productos_estadisticas AS
SELECT 
    p.id_producto,
    p.nombre,
    p.precio,
    p.stock,
    COALESCE(SUM(d.cantidad), 0) as total_vendido,
    COALESCE(SUM(d.cantidad * d.precio_unitario), 0) as ingresos_totales,
    COUNT(DISTINCT d.id_orden) as ordenes_asociadas,
    p.created_at,
    p.updated_at
FROM productos p
LEFT JOIN detalles_orden d ON p.id_producto = d.id_producto
GROUP BY p.id_producto, p.nombre, p.precio, p.stock, p.created_at, p.updated_at
ORDER BY total_vendido DESC;

-- ================================================
-- CONSULTAS DE VERIFICACIÓN
-- ================================================

-- Verificar que las tablas se crearon correctamente
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable,
    column_default
FROM information_schema.columns 
WHERE table_schema = 'public' 
    AND table_name IN ('productos', 'ordenes', 'detalles_orden')
ORDER BY table_name, ordinal_position;

-- Verificar los datos insertados
SELECT 'Productos' as tabla, COUNT(*) as total FROM productos
UNION ALL
SELECT 'Órdenes' as tabla, COUNT(*) as total FROM ordenes
UNION ALL
SELECT 'Detalles Orden' as tabla, COUNT(*) as total FROM detalles_orden;

-- ================================================
-- SCRIPT COMPLETADO
-- ================================================

COMMENT ON TABLE productos IS 'Tabla principal de productos del e-commerce';
COMMENT ON TABLE ordenes IS 'Tabla de órdenes de compra de clientes';
COMMENT ON TABLE detalles_orden IS 'Tabla de detalles de productos por orden';

COMMENT ON COLUMN productos.precio IS 'Precio del producto en USD, debe ser mayor a 0';
COMMENT ON COLUMN productos.stock IS 'Cantidad disponible en inventario, debe ser >= 0';
COMMENT ON COLUMN detalles_orden.cantidad IS 'Cantidad de producto en la orden, debe ser > 0';
COMMENT ON COLUMN detalles_orden.precio_unitario IS 'Precio del producto al momento de la orden';

-- Mostrar mensaje de finalización
SELECT 
    '🎉 Base de datos configurada exitosamente!' as mensaje,
    CURRENT_TIMESTAMP as fecha_configuracion;
