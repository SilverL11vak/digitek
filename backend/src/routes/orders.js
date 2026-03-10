const express = require('express');
const Stripe = require('stripe');
const { authRequired } = require('../middleware/auth');
const Order = require('../models/Order');
const { recordActivity } = require('../sockets/activity');

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2023-10-16'
});

router.post('/create-checkout-session', authRequired, async (req, res, next) => {
  try {
    const { items } = req.body;
    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'No items' });
    }
    const lineItems = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.title
        },
        unit_amount: Math.round(item.price * 100)
      },
      quantity: item.quantity || 1
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`
    });

    const total = items.reduce((sum, i) => sum + i.price * (i.quantity || 1), 0);
    const order = await Order.create({
      user: req.user._id,
      items: items.map((i) => ({
        design: i.designId,
        quantity: i.quantity || 1,
        price: i.price
      })),
      total,
      currency: 'usd',
      stripeSessionId: session.id
    });

    await recordActivity({
      type: 'order',
      message: `${req.user.name} placed an order for $${total.toFixed(2)}`,
      meta: { orderId: order._id, total },
      createdBy: req.user._id
    });

    res.json({ id: session.id, url: session.url });
  } catch (err) {
    next(err);
  }
});

router.get('/', authRequired, async (req, res, next) => {
  try {
    const query =
      req.user.role === 'admin' ? {} : { user: req.user._id };
    const orders = await Order.find(query)
      .populate('user', 'name email')
      .populate('items.design', 'title');
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
