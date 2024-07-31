const mongoose = require('mongoose')

const hodSchema = new mongoose.Schema({
  name: String,
  email:String,
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }],
});

const HOD = mongoose.model('HOD', hodSchema);

module.exports= HOD;
