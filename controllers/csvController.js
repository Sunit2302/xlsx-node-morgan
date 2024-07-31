const xlsx = require('xlsx');

const Admin = require("../models/adminModel")
const HOD = require("../models/hodModel")
const Teacher = require("../models/teacherModel")
const Student = require("../models/studentModel")
//const importFromExcel = require("../utils/excelToMongo.js")
const importDataFromExcel = async (req, res) => {
  
  try {
    const id = req.params.id;
    const importFromExcel = async (filePath) => {
      
      const workbook = xlsx.readFile(filePath);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = xlsx.utils.sheet_to_json(worksheet);
    
      for (const row of jsonData) {
        const { H_Name, H_Email, T_Name, T_Email, S_Name, S_Age, S_Email } = row;
    
        let student = await Student.findOneAndUpdate(
          { email: S_Email },
          { name: S_Name, email: S_Email, age: S_Age },
          { new: true, upsert: true }
        );
    
        let teacher = await Teacher.findOneAndUpdate(
          { email: T_Email },
          { name: T_Name, email: T_Email, $addToSet: { students: student._id } },
          { new: true, upsert: true }
        );
    
        let hod = await HOD.findOneAndUpdate(
          { email: H_Email },
          { name: H_Name, email: H_Email, $addToSet: { teachers: teacher._id } },
          { new: true, upsert: true }
        );
    
        await Admin.findByIdAndUpdate(
          { _id:id},
          { $addToSet: { hod: hod._id } },
          { new: true, upsert: true }
        );
      }
      console.log('Data imported successfully');
    };
    await importFromExcel(req.file.path);
    res.status(200).json({ message: 'Data imported from Excel successfully' });
  } catch (error) {
    console.error('Error importing data from Excel:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = importDataFromExcel