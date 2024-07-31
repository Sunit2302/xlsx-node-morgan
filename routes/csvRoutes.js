
const express = require('express');
const multer = require("multer");

const importDataFromExcel = require("../controllers/csvController")

const csvRoutes = express.Router();
const upload = multer({ dest: 'uploads/' });

csvRoutes.post('/import-data/:id', upload.single('file'), importDataFromExcel);

module.exports = csvRoutes
