const express = require('express');
const Razorpay = require('razorpay');
const { connectToDatabase } = require('../db');
const { createPayment } = require('../models/payment');

const router = express.Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { amount, currency = 'INR', date, timeSlot } = req.body;

    const options = {
      amount: amount * 100,
      currency,
      receipt: `rcpt_${new Date().getTime()}`
    };

    const order = await razorpay.orders.create(options);

    if (!order) return res.status(500).json({ success: false, message: 'Error creating order' });

    const paymentData = {
      order_id: order.id,
      amount,
      currency,
      status: 'CREATED',
      date,
      timeSlot
    };

    const paymentId = await createPayment(db, paymentData);

    res.status(200).json({
      success: true,
      orderId: order.id,
      key: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
