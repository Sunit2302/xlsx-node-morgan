const HOD =  require('../models/hodModel.js')
const Admin = require('../models/adminModel.js')



const createHod = async (req, res) => {
  try {
    const hodData = new HOD(req.body);
    const {  email } = hodData;


    const userExist = await HOD.findOne({ email });
    if (userExist) {
      return res.status(500).json({ message: "User already Exists." });
    }
    // const { id } = req.params;
    const updatedAdmin = await Admin.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { hod: hodData._id } },
      { new: true }
    )
    
    const savedHod = await hodData.save();
    res.status(200).json({
      // data: savedHod,
      updatedAdmin
    });
    // res.status(200).json(updatedClasss);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error."});
  }
};

const getHod = async (req, res) => {
  try {
    const hod = await HOD.find().populate({
      path: 'teachers',
      populate: {
        path: 'students',
        model: 'Student'
      }
    });
    console.log(hod);
    if (hod.length === 0) {
      return res.status(404).json({ message: "Hod Not Found." });
    }
    res.status(200).json(hod);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};


module.exports = {createHod, getHod}



    //const { name, email } = req.body;

    // Check if name or email is empty
    // if (!name.test() || !email) {
    //   return res.status(500).json({ message: "Name and email are required." });
    // }

    // // Validate email format
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // if (!emailRegex.test(email)) {
    //   return res.status(500).json({ message: "Invalid email format." });
    // }