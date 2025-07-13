import { Router } from 'express';
import { OrderDetailController } from '../controllers/OrderDetailController';

const router = Router();
const orderDetailController = new OrderDetailController();

// GET /api/order-details - Obtener todos los detalles de órdenes
router.get('/', orderDetailController.getAllOrderDetails);

// GET /api/order-details/order/:orderId - Obtener detalles de una orden específica
router.get('/order/:orderId', orderDetailController.getOrderDetailsByOrderId);

// GET /api/order-details/:id - Obtener un detalle por ID
router.get('/:id', orderDetailController.getOrderDetailById);

// POST /api/order-details - Crear un nuevo detalle de orden
router.post('/', orderDetailController.createOrderDetail);

// PUT /api/order-details/:id - Actualizar un detalle de orden
router.put('/:id', orderDetailController.updateOrderDetail);

// DELETE /api/order-details/:id - Eliminar un detalle de orden
router.delete('/:id', orderDetailController.deleteOrderDetail);

export default router;
