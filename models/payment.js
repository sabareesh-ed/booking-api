const { ObjectId } = require('mongodb');

const COLLECTION_NAME = 'slots';

async function createPayment(db, data) {
  const result = await db.collection(COLLECTION_NAME).insertOne(data);
  return result.insertedId;
}

async function updatePaymentStatus(db, orderId, status, paymentId = null) {
  const result = await db.collection(COLLECTION_NAME).updateOne(
    { order_id: orderId },
    { $set: { status, payment_id: paymentId } }
  );
  return result.modifiedCount > 0;
}

module.exports = {
  createPayment,
  updatePaymentStatus
};
