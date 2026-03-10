const express = require('express');
const Order = require('../models/Order');
const User = require('../models/User');
const Activity = require('../models/Activity');
const { authRequired, requireRole } = require('../middleware/auth');

const router = express.Router();

router.use(authRequired, requireRole('admin'));

router.get('/stats/overview', async (req, res, next) => {
  try {
    const [income, ordersCount, usersCount, activities] = await Promise.all([
      Order.aggregate([
        {
          $group: {
            _id: null,
            total: { $sum: '$total' }
          }
        }
      ]),
      Order.countDocuments(),
      User.countDocuments(),
      Activity.find().sort({ createdAt: -1 }).limit(20)
    ]);

    res.json({
      income: income[0]?.total || 0,
      ordersCount,
      usersCount,
      activities
    });
  } catch (err) {
    next(err);
  }
});

router.get('/users', async (req, res, next) => {
  try {
    const users = await User.find().select('-passwordHash');
    res.json(users);
  } catch (err) {
    next(err);
  }
});

router.put('/users/:id', async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    ).select('-passwordHash');
    res.json(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
