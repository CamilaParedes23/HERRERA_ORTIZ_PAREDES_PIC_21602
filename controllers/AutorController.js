const Autor = require('../models/Autor');

exports.getAllAutores = async (req, res) => {
    try {
        const autores = await Autor.getAll();
        res.status(200).json(autores);
    } catch (error) {
        console.error('Error al obtener autores:', error);
        res.status(500).json({ error: error.message});
    }
};

exports.getAutorById = async (req, res) => {
    try{
        const autor = await Autor.getById(req.params.id);
        if (!autor) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json(autor);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
};
exports.createAutor = async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);
        const autor = await Autor.create(req.body);
        res.status(201).json(autor);
    } catch (error) {
        console.error('Error al crear autor:', error);
        res.status(500).json({ error: error.message });
    }
};



exports.updateAutor = async (req, res) => {
    try {
        const autorActualizado = await Autor.update(req.params.id, req.body);
        if (!autorActualizado) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json(autorActualizado);
    } catch (error) {
        console.error('Error al actualizar autor:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.deleteAutor = async (req, res) => {
    try {
        const autorEliminado = await Autor.delete(req.params.id);
        if (!autorEliminado) {
            return res.status(404).json({ message: 'Autor no encontrado' });
        }
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar autor:', error);
        res.status(500).json({ error: error.message });
    }
};

