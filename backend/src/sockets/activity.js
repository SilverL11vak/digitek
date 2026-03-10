const Activity = require('../models/Activity');

let ioInstance;

function registerActivityEmitter(io) {
  ioInstance = io;
}

async function recordActivity(payload) {
  const activity = await Activity.create(payload);
  if (ioInstance) {
    ioInstance.emit('activity:new', activity);
  }
  return activity;
}

module.exports = { registerActivityEmitter, recordActivity };
