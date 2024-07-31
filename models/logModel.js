const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  method: String,
  url: String,
  status: Number,
  timestamp: { type: Date, default: Date.now },
  ipAddress : String
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;
