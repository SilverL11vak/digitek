const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ['order', 'quote', 'design', 'user'],
      required: true
    },
    message: { type: String, required: true },
    meta: {},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Activity', activitySchema);
