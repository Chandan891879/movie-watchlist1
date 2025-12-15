// Native MongoDB seed script — creates a demo user if not present
require('dotenv').config();
const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017';
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log('Connected to MongoDB at', uri);
    const db = client.db(process.env.DB_NAME || 'watchlist');
    const users = db.collection('users');

    const email = 'demo@example.com';
    const existing = await users.findOne({ email });
    if (existing) {
      console.log('Demo user already exists:', email);
      return;
    }

    const password = 'demo123';
    const hash = await bcrypt.hash(password, 10);
    const res = await users.insertOne({ name: 'Demo User', email, password: hash, createdAt: new Date() });
    console.log('Inserted demo user:', { id: res.insertedId, email, password });
  } catch (err) {
    console.error('Seed failed:', err);
  } finally {
    await client.close();
  }
}

run().catch(console.error);
