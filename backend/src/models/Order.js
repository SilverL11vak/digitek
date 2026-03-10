const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    items: [
      {
        design: { type: mongoose.Schema.Types.ObjectId, ref: 'Design', required: true },
        quantity: { type: Number, default: 1 },
        price: { type: Number, required: true }
      }
    ],
    total: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    status: {
      type: String,
      enum: ['pending', 'paid', 'fulfilled', 'cancelled'],
      default: 'pending'
    },
    stripeSessionId: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Order', orderSchema);
