const express = require('express');
const { connectToDatabase } = require('../db');
const { updatePaymentStatus } = require('../models/payment');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { payment_id, order_id, status } = req.body;

    const success = await updatePaymentStatus(db, order_id, status, payment_id);

    if (success) {
      res.status(200).json({ success: true });
    } else {
      res.status(404).json({ success: false, message: 'Payment not found or not updated' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
