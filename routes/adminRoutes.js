const express = require('express');

const {createAdmin, getAdmin} = require('../controllers/adminController.js')
//import  {createAdmin}  from '../controllers/adminController.js';

const adminRoutes = express.Router();

adminRoutes.post('/admin/create', createAdmin);
//router.get('/admin/:adminName', getAdminWithHOD);
adminRoutes.get('/admin/getAllData', getAdmin);

module.exports = adminRoutes






