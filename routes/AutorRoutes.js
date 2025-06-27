const express = require('express');
const router = express.Router();
const AutorController = require('../controllers/AutorController');

// Rutas para manejar las operaciones CRUD de autores
router.get('/autores', AutorController.getAllAutores); // Obtener todos los autores
router.get('/autores/:id', AutorController.getAutorById); // Obtener un autor por ID
router.post('/autores', AutorController.createAutor); // Crear un nuevo autor
router.put('/autores/:id', AutorController.updateAutor); // Actualizar un autor por ID
router.delete('/autores/:id', AutorController.deleteAutor); // Eliminar un autor por ID

module.exports = router; // Exportar el router para usarlo en el servidor principal
