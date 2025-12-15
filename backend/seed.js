// Seed script: creates a demo user for quick testing
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

async function run(){
  if(!process.env.MONGO_URI){
    console.error('MONGO_URI not set in .env');
    process.exit(1);
  }
  await mongoose.connect(process.env.MONGO_URI);
  console.log('Connected to MongoDB');

  const username = 'demo';
  const email = 'demo@example.com';
  const password = 'demo123';

  const exists = await User.findOne({ email });
  if (exists) {
    console.log('Demo user already exists:', email);
    process.exit(0);
  }

  const hash = await bcrypt.hash(password, 10);
  const user = await User.create({ name: 'Demo User', email, password: hash });
  console.log('Created demo user:', { id: user._id, email, password });
  process.exit(0);
}

run().catch(err => { console.error(err); process.exit(1); });
