const express = require('express');
const { initializePayment, verifyPayment, getDonations } = require('../controllers/paymentController');
const router = express.Router();

router.post('/initialize', initializePayment);
router.post('/verify', verifyPayment);
router.get('/donations', getDonations);

module.exports = router;