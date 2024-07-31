const express = require('express');
//import { addStudentToTeacher, getTeacherWithStudents } from '../controllers/teacherController.js';
const {createTeacher, getTeacher} = require('../controllers/teacherController.js')
const teacherrouter = express.Router();

teacherrouter.post('/teacher/create/:id', createTeacher);
// router.get('/teacher/:teacherName', getTeacherWithStudents);
teacherrouter.get('/teacher/getAllData', getTeacher)

module.exports =  teacherrouter;
