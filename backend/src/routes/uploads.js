const express = require('express');
const cloudinary = require('cloudinary').v2;
const { authRequired } = require('../middleware/auth');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const router = express.Router();

// Expects base64 image data
router.post('/image', authRequired, async (req, res, next) => {
  try {
    const { dataUrl, folder = 'digitek' } = req.body;
    if (!dataUrl) {
      return res.status(400).json({ message: 'dataUrl required' });
    }
    const result = await cloudinary.uploader.upload(dataUrl, {
      folder
    });
    res.json({ url: result.secure_url, publicId: result.public_id });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
