const mongoose = require('mongoose');

const designSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, default: 0 },
    isForSale: { type: Boolean, default: true },
    categories: [{ type: String }],
    tags: [{ type: String }],
    thumbnailUrl: String,
    canvasJson: {}, // serialized Konva/Fabric JSON
    exportUrls: {
      png: String,
      svg: String,
      pdf: String
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Design', designSchema);
