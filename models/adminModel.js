const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
  name: String,
  hod: [
  { type: mongoose.Schema.Types.ObjectId, ref: "HOD" }
],
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
