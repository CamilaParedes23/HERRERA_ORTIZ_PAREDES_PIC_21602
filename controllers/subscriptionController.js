const Subscription = require('../models/subscription');

exports.getAllSubscriptions = async (req, res) => {
  try {
    const subs = await Subscription.getAll();
    res.json(subs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getSubscriptionById = async (req, res) => {
  try {
    const sub = await Subscription.getById(req.params.id);
    if (!sub) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json(sub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubscription = async (req, res) => {
  try {
    const newSub = await Subscription.create(req.body);
    res.status(201).json(newSub);
  } catch (error) {
    // Puede ser violación de restricción UNIQUE consumidor_id + curso_id
    if (error.code === '23505') {
      return res.status(400).json({ error: 'El usuario ya está suscrito a este curso' });
    }
    res.status(500).json({ error: error.message });
  }
};

exports.updateSubscription = async (req, res) => {
  try {
    const updatedSub = await Subscription.update(req.params.id, req.body);
    if (!updatedSub) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json(updatedSub);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteSubscription = async (req, res) => {
  try {
    const deleted = await Subscription.delete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Suscripción no encontrada' });
    res.json({ message: 'Suscripción eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
