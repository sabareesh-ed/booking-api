// db.js
const { MongoClient } = require('mongodb');

const uri = process.env.MONGODB_URI;
let client;

async function connectToDatabase() {
  if (!client || !client.topology || !client.topology.isConnected()) {
    client = new MongoClient(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      tls: true // Ensure TLS is enabled
    });
    await client.connect();
  }
  return client.db('booked-slots');
}

module.exports = { connectToDatabase };
