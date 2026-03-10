require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const Design = require('../models/Design');
const Order = require('../models/Order');

async function run() {
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([User.deleteMany({}), Design.deleteMany({}), Order.deleteMany({})]);

  const passwordHash = await bcrypt.hash('password123', 10);
  const admin = await User.create({
    name: 'Admin',
    email: 'admin@example.com',
    passwordHash,
    role: 'admin'
  });

  const user = await User.create({
    name: 'Lis Kaur',
    email: 'lis@example.com',
    passwordHash,
    role: 'user'
  });

  const designs = await Design.insertMany([
    {
      title: 'Hibana Welding Rounded',
      description: 'Vintage welding company sticker',
      owner: user._id,
      price: 4.99,
      isForSale: true,
      categories: ['Stickers', 'Rounded'],
      thumbnailUrl: '',
      canvasJson: {}
    },
    {
      title: 'Life is Good Stay True',
      description: 'Positive vibes sticker',
      owner: user._id,
      price: 3.5,
      isForSale: true,
      categories: ['Stickers', 'Rounded'],
      thumbnailUrl: '',
      canvasJson: {}
    }
  ]);

  await Order.create({
    user: user._id,
    items: [
      { design: designs[0]._id, quantity: 10, price: designs[0].price },
      { design: designs[1]._id, quantity: 5, price: designs[1].price }
    ],
    total: 10 * designs[0].price + 5 * designs[1].price,
    currency: 'usd',
    status: 'paid'
  });

  console.log('Seeded sample data');
  await mongoose.disconnect();
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

