const User = require('../models/user');

const userController = {
  async createUser(req, res) {
    try {
      const { nombres, apellidos, email, password, tipo_usuario } = req.body;

      // Validaciones
      if (!nombres || !apellidos || !email || !password || !tipo_usuario) {
        return res.status(400).json({ error: 'Todos los campos son requeridos' });
      }

      const validUserTypes = ['administrador', 'creador', 'consumidor'];
      if (!validUserTypes.includes(tipo_usuario)) {
        return res.status(400).json({ error: 'Tipo de usuario inválido' });
      }

      // Verificar si el usuario ya existe
      const existingUser = await User.getByEmail(email);
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }

      // Verificar si ya hay un administrador
      if (tipo_usuario === 'administrador') {
        const adminCount = await User.countAdmins();
        if (adminCount > 0) {
          return res.status(400).json({ error: 'Solo puede haber un administrador' });
        }
      }

      // Crear usuario
      const user = await User.create({
        nombres,
        apellidos,
        email,
        password,
        tipo_usuario
      });

      res.status(201).json(user);
    } catch (error) {
      console.error('Error al crear usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getAllUsers(req, res) {
    try {
      const users = await User.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async getUserById(req, res) {
    try {
      const user = await User.getUserById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(user);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  },

  async updateUser(req, res) {
    // Implementar actualización
  },

  async deleteUser(req, res) {
    // Implementar eliminación
  }
};

module.exports = userController;