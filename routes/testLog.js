const express = require('express');
const { connectToDatabase } = require('../db');

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const db = await connectToDatabase();
    const { queryText, timestamp } = req.body;

    if (!queryText) {
      return res.status(400).json({ success: false, message: 'Query text is required' });
    }

    const result = await db.collection('testLogs').insertOne({ queryText, timestamp });

    res.status(200).json({ success: true, insertedId: result.insertedId });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;
