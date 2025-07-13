import { Router } from 'express';
import { OrderController } from '../controllers/OrderController';

const router = Router();
const orderController = new OrderController();

// GET /api/orders - Obtener todas las órdenes
router.get('/', orderController.getAllOrders);

// GET /api/orders/:id - Obtener una orden por ID
router.get('/:id', orderController.getOrderById);

// POST /api/orders - Crear una nueva orden
router.post('/', orderController.createOrder);

// PUT /api/orders/:id - Actualizar una orden
router.put('/:id', orderController.updateOrder);

// DELETE /api/orders/:id - Eliminar una orden
router.delete('/:id', orderController.deleteOrder);

export default router;
