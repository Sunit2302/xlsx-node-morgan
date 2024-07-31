const Admin = require('../models/adminModel.js')
//import Admin from '../models/adminModel.js';
//import HOD from '../models/hodModel.js';
const HOD = require('../models/hodModel.js')
// Create an Admin with an HOD

const nodemailer = require("nodemailer")

const createAdmin = async (req, res) => {
  try {
    const { name , h_id } = req.body;
    console.log(req.body);
    const newAdmin = new Admin({ name , hod:h_id });
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error', error });
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await Admin.find().populate({
      path: 'hod',
      populate: {
        path: 'teachers',
        populate: {
          path: 'students',
        }
      }
    });
    console.log(admin);
    if (admin.length === 0) {
      return res.status(404).json({ message: "Admin Not Found." });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ error: "Internal Server error." });
  }
};




module.exports = {createAdmin , getAdmin }