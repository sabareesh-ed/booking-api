// routes/getBookedSlots.js
const express = require('express');
const { connectToDatabase } = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { date } = req.query;

    console.log(date)

    if (!date) {
      return res.status(400).json({ success: false, message: 'Date is required' });
    }

    const bookedSlots = await db.collection('slots').find({ date, status: 'PAID' }).toArray();
    const slots = bookedSlots.map((slot) => slot.timeSlot);

    res.status(200).json({ success: true, slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
