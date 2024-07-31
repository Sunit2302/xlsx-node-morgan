const Teacher = require('../models/teacherModel.js')

const Student = require('../models/studentModel.js')

const createStudent = async (req, res) => {
  try {
    const studData = new Student(req.body);
    const { email } = studData;


    const userExist = await Student.findOne({ email });
    if (userExist) {
      return res.status(500).json({ message: "User already Exists." });
    }
    // const { id } = req.params;
    const updatedTeacher = await Teacher.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { students: studData._id } },
      { new: true }
    )
    
    const savedHod = await studData.save();
    res.status(200).json({
      // data: savedHod,
      updatedTeacher
    });
    // res.status(200).json(updatedClasss);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error."});
  }
};

const getStudent = async (req, res) => {
  try {
    const users = await Student.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Student Not Found." });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};





module.exports = {createStudent, getStudent}