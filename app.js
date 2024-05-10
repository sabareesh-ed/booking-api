// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const initiatePaymentRoute = require('./routes/initiatePayment');
const paymentStatusRoute = require('./routes/paymentStatus');
const getBookedSlotsRoute = require('./routes/getBookedSlots');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/initiatePayment', initiatePaymentRoute);
app.use('/api/paymentStatus', paymentStatusRoute);
app.use('/api/getBookedSlots', getBookedSlotsRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;