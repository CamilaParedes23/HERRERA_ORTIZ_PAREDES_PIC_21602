const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');

router.get('/suscripciones', subscriptionController.getAllSubscriptions);
router.get('/suscripciones/:id', subscriptionController.getSubscriptionById);
router.post('/suscripciones', subscriptionController.createSubscription);
router.put('/suscripciones/:id', subscriptionController.updateSubscription);
router.delete('/suscripciones/:id', subscriptionController.deleteSubscription);

module.exports = router;
