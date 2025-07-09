// routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courseController');

router.get('/cursos', courseController.getAllCourses);
router.get('/cursos/:id', courseController.getCourseById);
router.post('/cursos', courseController.createCourse);
router.put('/cursos/:id', courseController.updateCourse);
router.delete('/cursos/:id', courseController.deleteCourse);

module.exports = router;