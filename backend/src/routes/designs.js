const express = require('express');
const { body, validationResult } = require('express-validator');
const Design = require('../models/Design');
const { authRequired } = require('../middleware/auth');
const { recordActivity } = require('../sockets/activity');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const { q } = req.query;
    const criteria = q
      ? {
          $or: [
            { title: { $regex: q, $options: 'i' } },
            { description: { $regex: q, $options: 'i' } },
            { categories: { $regex: q, $options: 'i' } }
          ]
        }
      : {};
    const designs = await Design.find(criteria).populate('owner', 'name');
    res.json(designs);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id).populate('owner', 'name');
    if (!design) return res.status(404).json({ message: 'Design not found' });
    res.json(design);
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authRequired,
  [body('title').notEmpty(), body('canvasJson').notEmpty()],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const payload = { ...req.body, owner: req.user._id };
      const design = await Design.create(payload);
      await recordActivity({
        type: 'design',
        message: `${req.user.name} created design "${design.title}"`,
        meta: { designId: design._id },
        createdBy: req.user._id
      });
      res.status(201).json(design);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', authRequired, async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ message: 'Design not found' });
    if (!design.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    Object.assign(design, req.body);
    await design.save();
    res.json(design);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authRequired, async (req, res, next) => {
  try {
    const design = await Design.findById(req.params.id);
    if (!design) return res.status(404).json({ message: 'Design not found' });
    if (!design.owner.equals(req.user._id) && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Forbidden' });
    }
    await design.remove();
    res.json({ message: 'Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
