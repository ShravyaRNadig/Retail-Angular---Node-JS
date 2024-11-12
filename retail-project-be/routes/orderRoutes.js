const express = require('express');
const { createOrder, processPayment } = require('../controllers/orderController');
const router = express.Router();

router.post('/orders', createOrder);
router.post('/payment', processPayment);

module.exports = router;
