const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatarUrl: String,
    bio: String,
    designs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Design' }]
  },
  { timestamps: true }
);

userSchema.methods.toJSONSafe = function toJSONSafe() {
  const obj = this.toObject();
  delete obj.passwordHash;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
