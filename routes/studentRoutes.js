const express = require('express');

const {createStudent, getStudent} = require('../controllers/studentController')
//import  {createAdmin}  from '../controllers/adminController.js';

const studentRoutes = express.Router();

studentRoutes.post('/student/create/:id', createStudent);
//router.get('/admin/:adminName', getAdminWithHOD);

studentRoutes.get('/student/getAllData', getStudent)

module.exports = studentRoutes
