const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
  name: String,
  email:String,
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
});

const Teacher = mongoose.model('Teacher', teacherSchema);

module.exports= Teacher;
