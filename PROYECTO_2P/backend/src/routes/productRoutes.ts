import { Router } from 'express';
import { ProductController } from '../controllers/ProductController';

const router = Router();
const productController = new ProductController();

// GET /api/products - Obtener todos los productos
router.get('/', productController.getAllProducts);

// GET /api/products/:id - Obtener un producto por ID
router.get('/:id', productController.getProductById);

// POST /api/products - Crear un nuevo producto
router.post('/', productController.createProduct);

// PUT /api/products/:id - Actualizar un producto
router.put('/:id', productController.updateProduct);

// DELETE /api/products/:id - Eliminar un producto
router.delete('/:id', productController.deleteProduct);

export default router;
