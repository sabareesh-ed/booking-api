// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const initiatePaymentRoute = require('./routes/initiatePayment');
const paymentStatusRoute = require('./routes/paymentStatus');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api/initiatePayment', initiatePaymentRoute);
app.use('/api/paymentStatus', paymentStatusRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
