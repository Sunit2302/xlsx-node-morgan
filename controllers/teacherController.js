const HOD =  require('../models/hodModel.js')
const Teacher = require('../models/teacherModel.js')


const createTeacher = async (req, res) => {
  try {
    const teacherData = new Teacher(req.body);
    const { email } = teacherData;


    const userExist = await Teacher.findOne({ email });
    if (userExist) {
      return res.status(500).json({ message: "User already Exists." });
    }
    // const { id } = req.params;
    const updatedHod = await HOD.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { teachers: teacherData._id } },
      { new: true }
    )
    
    const savedHod = await teacherData.save();
    res.status(200).json({
      // data: savedHod,
      updatedHod
    });
    // res.status(200).json(updatedClasss);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error."});
  }
};

const getTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.find().populate('students');
    console.log(teacher);
    if (teacher.length === 0) {
      return res.status(404).json({ message: "Teacher Not Found." });
    }
    res.status(200).json(teacher);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};

module.exports = {createTeacher, getTeacher}